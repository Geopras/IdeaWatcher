package main.java.de.ideaWatcher.webApi.workflow;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONObject;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;

public class DeleteIdeaWorkflow implements IWorkflow {
    private static final Logger log = Logger
            .getLogger(ProfileEditWorkflow.class.getName());
    private IIdeaController ideaController;
    private IUserController userController;

    public DeleteIdeaWorkflow() {

        this.userController = InstanceManager.getDataManager()
                .getUserController();
        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
    }

    public IResponse getResponse(IRequest request) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        String userId;
        String ideaId;

        IUser currentUser;
        IIdea currentIdea;
        ICreator currentCreator;
        
        JSONObject responseData = new JSONObject();

        try {
            JSONObject deleteIdeaData = request.getData();
            ideaId = deleteIdeaData.getString("ideaId");

        } catch (Exception ex) {
            response.setErrorMessage("SIdeaList_deleteIdeaData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        // IdeenObjekt aus db holen um daran den Creator zu finden
        try {
            currentIdea = ideaController.getIdea(ideaId);
        } catch (Exception ex) {
            response.setErrorMessage(
                    "SIdeaList_deleteIdeaGetDBObjects_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Abrufen des Ideeobjekts aus der DB ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        currentCreator = currentIdea.getCreator();
        userId = currentCreator.getUserId();

        // UserObjekt aus db holen
        try {
            currentUser = userController.getUser(userId);
        } catch (Exception ex) {
            response.setErrorMessage(
                    "SIdeaList_deleteIdeaGetDBObjects_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Abrufen des Userobjekts aus der DB ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        // Idee aus globaler Ideenliste löschen
        try {
            ideaController.deleteIdea(ideaId);
        } catch (Exception ex) {
            response.setErrorMessage(
                    "SIdeaList_deleteIdeaIdeaController_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Löschen der Idee aus der DB ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        // Idee aus createdIdeas löschen, dazu erstmal tatsächliches Objekt mit der passenden IdeaId holen

        if (currentUser.getCreatedIdeas().contains(ideaId)){
            currentUser.getCreatedIdeas().remove(ideaId);
        } else{
            response.setErrorMessage("SIdeaList_deleteIdeaIntegrity_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Löschen der Idee aus der CreatedIdeasList ist ein Fehler aufgetreten. Der User hat die Idee "
                            + "nicht angelegt." + "\nFehlermeldung: ");
            return response;
        }


        responseData.put("ideaId", ideaId);
        
        response.setResult("success");
        response.setData(responseData);
        return response;

    }

}
