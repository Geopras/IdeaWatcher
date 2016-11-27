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

import java.util.logging.Level;
import java.util.logging.Logger;

public class SaveIdeaWorkflow implements IWorkflow{

	private static final Logger log = Logger
	            .getLogger(ProfileEditWorkflow.class.getName());
	private IIdeaController ideaController;
    private IUserController userController;
	
	    
    public SaveIdeaWorkflow() {

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
        String ideaStatus;
        String ideaName;
        String description;
        String category;
        
        IIdea newIdea;
        
        try {
            JSONObject data = request.getData();
            ideaStatus = data.getString("ideaStatus");
            if (ideaStatus.equals("edit")) {
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

        // zu speicherndes Ideen-Objekt zusammenstellen
        newIdea = new Idea();
        newIdea.setName(ideaName);
        newIdea.setDescription(description);
        newIdea.setCategory(category);
        ICreator creator = newIdea.getCreator();
        creator.setUserId(userId);
        creator.setEmail(user.getEmail());
        creator.setIsMailPublic(user.getIsMailPublic());
        creator.setPictureURL(user.getPictureURL());
        creator.setUserName(user.getUserName());
        newIdea.setCreator(creator);

        if (ideaStatus.equals("saveNew")) {  // Wenn Idee neu erstellt wird

            // Neue Idee in Ideen-DB hinzufügen

            try {
                ideaId = ideaController.addNewIdea(newIdea, userId);

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
        else if (ideaStatus.equals("edit")) {
            // Wenn vorhandene Idee bearbeitet werden soll

            IIdea idea;
            try {
                idea = this.ideaController.getIdea(ideaId);

                idea.setName(ideaName);
                idea.setDescription(description);
                idea.setCategory(category);

                this.ideaController.updateIdea(idea);

                response.setResult("success");
                return response;

            } catch (Exception e) {
                response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Abrufen einer zu bearbeitenden Idee ist ein" +
                                " Fehler aufgetreten!"
                                + "\nFehlermeldung: " + e.getMessage());
                return response;
            }

            // Idee aktualisieren

        } else {
            response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Es konnte die Idee nicht gespeichert werden, weil ihr " +
                            "Status nicht erkannt wird! Es ist der Status " +
                            "'saveNew' oder 'edit' anzugeben.'");
            return response;
        }
    }
}
