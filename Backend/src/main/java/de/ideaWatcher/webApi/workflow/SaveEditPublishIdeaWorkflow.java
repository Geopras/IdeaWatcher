package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SaveEditPublishIdeaWorkflow implements IWorkflow{

	private static final Logger log = Logger
	            .getLogger(ProfileEditWorkflow.class.getName());
	private IIdeaController ideaController;
    private IUserController userController;
	
	    
    public SaveEditPublishIdeaWorkflow() {

        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
        this.userController = InstanceManager.getDataManager()
                .getUserController();
    }
	    
	@Override
	public IResponse getResponse(IRequest request) {
		
		 // Workflow-Antwort instanziieren
        IResponse response = new Response();
        
        String userId = request.getUserId();
        String ideaId = "";
        String ideaName = "";
        String description = "";
        String category = "";
        boolean isEdit = false;
        boolean isSaveNew = false;
        boolean isPublishNew = false;
        boolean isPublish = false;

        IIdea idea;
        
        try {
            JSONObject data = request.getData();
            String ideaStatus = data.getString("ideaStatus");
            switch (ideaStatus) {
                case "edit":
                    isEdit = true;
                    break;
                case "saveNew":
                    isSaveNew = true;
                    break;
                case "publishNew":
                    isPublishNew = true;
                    break;
                case "publish":
                    isPublish = true;
                    break;
                default:
                    response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
                    response.setResult("error");
                    log.log(Level.SEVERE,
                            String.format("Beim Auslesen der RequestData-Parameter ist ein Fehler aufgetreten. Der IdeaStatus %s ist unbekannt.", ideaStatus));
                    return response;
            }
            // Wenn vorhandene Idee bearbeitet bzw. veröffentlicht werden soll,
            // dann muss eine IdeaId mitgegeben worden sein
            if (isEdit || isPublish) {
                ideaId = data.getString("ideaId");
            }
            ideaName = data.getString("ideaName");
            description = data.getString("ideaDescription");
            category = data.getString("ideaCategory");

        } catch (Exception ex) {
            response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        // Suche den User heraus, der der Ideenersteller ist:
        // ID der neuen Idee in Liste createdIdeas des Users hinzufügen
        IUser user;
        try {
            user = this.userController.getUser(userId);

        } catch (Exception e) {

            response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim DB-Abruf des User, der der Ideenersteller ist," +
                            " Fehler aufgetreten!"
                            + "\nFehlermeldung: " + e.getMessage());
            return response;
        }

        // Wenn Idee neu erstellt wurde, dann füge Idee in DB hinzu
        if (isSaveNew || isPublishNew) {

            // Neue Idee in Ideen-DB hinzufügen
            // zu speicherndes Ideen-Objekt zusammenstellen
            idea = new Idea();
            idea.setName(ideaName);
            idea.setDescription(description);
            idea.setCategory(category);

            // Ersteller der Idee speichern
            ICreator creator = idea.getCreator();
            creator.setUserId(userId);
            creator.setEmail(user.getEmail());
            creator.setIsMailPublic(user.getIsMailPublic());
            creator.setPictureURL(user.getPictureURL());
            creator.setUserName(user.getUserName());
            idea.setCreator(creator);

            if (isPublishNew) {
                idea.setIsPublished(true);
            }

            try {
                ideaId = ideaController.addNewIdea(idea, userId);

            } catch (Exception ex) {
                response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Hinzufügen einer neuen Idee ist ein " +
                                "Fehler aufgetreten!"
                                + "\nFehlermeldung: " + ex.getMessage());
                return response;
            }

            // ID der neuen Idee in Liste createdIdeas des Users hinzufügen
            try {
                user.getCreatedIdeas().add(ideaId);
                this.userController.updateUser(user);
                response.setResult("success");
                return response;

            } catch (Exception e) {

                response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Hinzufügen einer neuen Idee in die " +
                                "CreatedIdeas-Liste des angemeldeten User ist ein" +
                                " Fehler aufgetreten!"
                                + "\nFehlermeldung: " + e.getMessage());
                return response;
            }
        }
        else if (isEdit || isPublish) {  // Wenn vorhandene Idee bearbeitet oder veröffentlicht werden soll

            try {
                idea = this.ideaController.getIdea(ideaId);

            } catch (Exception e) {
                response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Abrufen einer zu bearbeitenden Idee ist ein" +
                                " Fehler aufgetreten!"
                                + "\nFehlermeldung: " + e.getMessage());
                return response;
            }
            idea.setName(ideaName);
            idea.setDescription(description);
            idea.setCategory(category);
            idea.setPublishDate(new Date());

            if (isPublish) {
                idea.setIsPublished(true);
            }

            try {
                this.ideaController.updateIdea(idea);

                response.setResult("success");
                return response;

            } catch (Exception ex) {

                response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Aktualisieren einer zu bearbeitenden oder zu veröffentlichenden Idee in der DB ist ein" +
                                " Fehler aufgetreten!"
                                + "\nFehlermeldung: " + ex.getMessage());
                return response;
            }
        } else {

            response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Die Idee konnte nicht gespeichert werden, weil ihr Status unbekannt ist");
            return response;
        }
    }
}
