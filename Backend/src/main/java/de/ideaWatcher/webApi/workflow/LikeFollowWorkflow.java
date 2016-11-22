package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *     hier drin soll eine Idee gelikt, unliked, verfolgt, entfolgt werden können
 *     liken: NutzerID und IdeenID übergeben --> bekomme Info über Ergebnis des requests und Anzahl der Likes für diese Idee zurück
 */
public class LikeFollowWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( ProfileEditWorkflow.class.getName() );
    private IIdeaController ideaController;
    private IUserController userController;

    public LikeFollowWorkflow() {

        this.userController = InstanceManager.getDataManager().getUserController();
        this.ideaController = InstanceManager.getDataManager().getIdeaController();
    }

    public IResponse getResponse(IRequest request) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        String userId;
        String ideaId;
        String action;
        IUser currentUser;
        IIdea currentIdea;
        boolean ideaChanged = false;
        boolean userChanged = false;
        JSONObject resultValuesObject = new JSONObject();

        try {
            JSONObject likeFollowData = request.getData();
            userId = likeFollowData.getString("userId");
            ideaId = likeFollowData.getString("ideaId");
            action = likeFollowData.getString("action");
        } catch (Exception ex) {
            response.setErrorMessage("SIdeaDetails_likeFollowData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!" +
                    "\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }

        // Objekte aus db holen
        try {
            currentUser = userController.getUser(userId);
            currentIdea = ideaController.getIdea(ideaId);
        } catch (Exception ex) {
            response.setErrorMessage("SIdeaDetails_likeFollowGetDBObjects_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Abrufen der Idee- und User-Objekte aus der DB ist ein Fehler aufgetreten!" +
                    "\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }

        long newNumberLikes;
        long newNumberFollows;

        switch (action){
            case "like":

                currentIdea.getLikeUsers().add(userId);
                newNumberLikes = (long) currentIdea.getLikeUsers().size();
                currentIdea.setNumberLikes(newNumberLikes);

                ideaChanged = true;

                resultValuesObject.put("action", "like");
                resultValuesObject.put("newNumber", newNumberLikes);

                break;
            case "unlike":

                currentIdea.getLikeUsers().remove(userId);
                newNumberLikes = (long) currentIdea.getLikeUsers().size();
                currentIdea.setNumberLikes(newNumberLikes);

                ideaChanged = true;

                resultValuesObject.put("action", "like");
                resultValuesObject.put("newNumber", newNumberLikes);

                break;
            case "follow":

                currentIdea.getFollowerUsers().add(userId);
                newNumberFollows = (long) currentIdea.getFollowerUsers().size();
                currentIdea.setNumberFollowers(newNumberFollows);

                currentUser.getFollowedIdeas().add(currentIdea);
                currentUser.setNumberFollowedIdeas(currentUser.getFollowedIdeas().size());

                ideaChanged = true;
                userChanged = true;

                resultValuesObject.put("action", "follow");
                resultValuesObject.put("newNumber", newNumberFollows);

                break;
            case "unfollow":

                currentIdea.getFollowerUsers().remove(userId);
                newNumberFollows = (long) currentIdea.getFollowerUsers().size();
                currentIdea.setNumberFollowers(newNumberFollows);

                IIdea oldIdeaInstance = null;
                for (IIdea oldIdea : currentUser.getFollowedIdeas()){
                    if (oldIdea.getIdeaId().equals(ideaId)){
                        oldIdeaInstance = oldIdea;
                    }
                }
                if (oldIdeaInstance == null){

                    response.setErrorMessage("SIdeaDetails_likeFollowIntegrity_error");
                    response.setResult("error");
                    log.log(Level.SEVERE, "Beim unfollowen einer Idee ist ein Fehler aufgetreten. Der User folgte " +
                            "der Idee garnicht." +
                            "\nFehlermeldung: ");
                    return response;

                } else{
                    currentUser.getFollowedIdeas().remove(oldIdeaInstance);
                }
                currentUser.setNumberFollowedIdeas(currentUser.getFollowedIdeas().size());

                ideaChanged = true;
                userChanged = true;

                resultValuesObject.put("action", "follow");
                resultValuesObject.put("newNumber", newNumberFollows);

                break;
            default:
                response.setErrorMessage("SIdeaDetails_likeFollowData_error");
                response.setResult("error");
                log.log(Level.SEVERE, "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!" +
                        "Der Wert für Aktion ist nicht im definierten Bereich." +
                        "\nFehlermeldung: ");
                return response;
        }


        try {
            if (ideaChanged){
                ideaController.changeIdea(ideaId, currentIdea);
            }
            if (userChanged){
                userController.changeUser(userId, currentUser);
            }

            response.setResult("success");
            response.setData(resultValuesObject);
            return response;


        } catch (Exception ex) {
            response.setErrorMessage("SIdeaDetails_likeFollowSaveData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Speichern der Daten einer Like/Follow Aktion ist ein Fehler aufgetreten!" +
                    "\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }
    }

}
