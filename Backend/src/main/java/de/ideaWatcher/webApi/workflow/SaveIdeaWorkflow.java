package main.java.de.ideaWatcher.webApi.workflow;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONObject;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;

public class SaveIdeaWorkflow implements IWorkflow{

	private static final Logger log = Logger
	            .getLogger(ProfileEditWorkflow.class.getName());
	private IIdeaController ideaController;
	
	    
    public SaveIdeaWorkflow() {

        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
    }
	    
	@Override
	public IResponse getResponse(IRequest request) {
		
		 // Workflow-Antwort instanziieren
        IResponse response = new Response();
        
        String userId = request.getUserId();
        String ideaStatus;
        String ideaName;
        String description;
        String category;
        
        IIdea newIdea;
        
        try {
            JSONObject commentData = request.getData();
            ideaStatus = commentData.getString("ideaStatus");
            ideaName = commentData.getString("ideaName");
            description = commentData.getString("ideaDescription");
            category = commentData.getString("ideaCategory");
        } catch (Exception ex) {
            response.setErrorMessage("SIdeaCreation_saveIdeaData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }
        
        newIdea = new Idea();
        newIdea.setName(ideaName);
        newIdea.setDescription(description);
        newIdea.setCategory(category);
        
        //create Idea in Backend
        try {

        	ideaController.addNewIdea(newIdea, userId);

            response.setResult("success");
//            respData.put("idea", JSONBuilder.getIdeaDetailsJSONObject(currentIdea));
//            response.setData(respData);
            return response;

        } catch (Exception ex) {
            response.setErrorMessage("SIdeaCreation_storeIdea_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Speichern der Daten einer Like/Follow Aktion ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }
	}
}