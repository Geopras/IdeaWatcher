package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

public class DeleteCommentWorkflow implements IWorkflow {

        private static final Logger log = Logger
                .getLogger(ProfileEditWorkflow.class.getName());
        private IIdeaController ideaController;
//        private IUserController userController;

        public DeleteCommentWorkflow() {

            this.ideaController = InstanceManager.getDataManager()
                    .getIdeaController();
//            this.userController = InstanceManager.getDataManager()
//                    .getUserController();
        }

        public IResponse getResponse(IRequest request) {

            // Workflow-Antwort instanziieren
            IResponse response = new Response();

            String commentId;
            String ideaId;

            IIdea currentIdea;
//            IUser currentUser;
            IComment currentComment;

            try {
                JSONObject commentData = request.getData();
                commentId = commentData.getString("commentId");
                ideaId = commentData.getString("ideaId");
            } catch (Exception ex) {
                response.setErrorMessage("SIdeaDetails_deleteCommentData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!"
                                + "\nFehlermeldung: " + ex.getMessage());
                return response;
            }

            // Objekte aus db holen
            try {
                currentIdea = ideaController.getIdea(ideaId);
                
            } catch (Exception ex) {
                response.setErrorMessage(
                        "SIdeaDetails_deleteCommentGetDBObjects_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Abrufen des Ideeobjekts aus der DB ist ein Fehler aufgetreten!"
                                + "\nFehlermeldung: " + ex.getMessage());
                return response;
            }
            
//            try {
//                currentUser = userController.getUser(commentId);
//                
//            } catch (Exception ex) {
//                response.setErrorMessage(
//                        "SIdeaDetails_saveCommentGetDBObjects_error");
//                response.setResult("error");
//                log.log(Level.SEVERE,
//                        "Beim Abrufen des Userobjekts aus der DB ist ein Fehler aufgetreten!"
//                                + "\nFehlermeldung: " + ex.getMessage());
//                return response;
//            }
            
            IComment oldCommentInstance = null;
            for (IComment oldComment : currentIdea.getComments()){
                if (oldComment.getCommentId().equals(commentId)){
                    oldCommentInstance = oldComment;
                }
            }
            if (oldCommentInstance == null){

                response.setErrorMessage("SIdeaDetails_deleteCommentIntegrity_error");
                response.setResult("error");
                log.log(Level.SEVERE, "Beim Löschen des Kommentars ist ein Fehler aufgetreten. Die CommentId konnte " +
                        "nicht zur Idee zugeordnet werden." +
                        "\nFehlermeldung: ");
                return response;

            } else{
                currentIdea.getComments().remove(oldCommentInstance);
                // Anzahl Kommentare aktualisieren
                currentIdea.setNumberComments((long)currentIdea.getComments().size());
            }

            
            
            JSONObject respData = new JSONObject();
            try {
                ideaController.updateIdea(currentIdea);

                response.setResult("success");
                respData.put("idea", JSONBuilder.getIdeaDetailsJSONObject(currentIdea));
                response.setData(respData);
                return response;

            } catch (Exception ex) {
                response.setErrorMessage("SIdeaDetails_deleteCommentSaveData_error");
                response.setResult("error");
                log.log(Level.SEVERE,
                        "Beim Speichern der geänderten Ideen ist ein Fehler aufgetreten!"
                                + "\nFehlermeldung: " + ex.getMessage());
                return response;
            }
        }
    


}
