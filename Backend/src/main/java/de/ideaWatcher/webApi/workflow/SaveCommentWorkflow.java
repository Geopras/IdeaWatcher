package main.java.de.ideaWatcher.webApi.workflow;

import java.util.logging.Level;
import java.util.logging.Logger;

import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import org.json.JSONObject;

import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;

public class SaveCommentWorkflow implements IWorkflow {

    private static final Logger log = Logger
            .getLogger(ProfileEditWorkflow.class.getName());
    private IIdeaController ideaController;

    public SaveCommentWorkflow() {

        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
    }

    public IResponse getResponse(IRequest request) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        String userId;
        String ideaId;
        String commentText;

        IIdea currentIdea;
        IComment currentComment;

        try {
            JSONObject commentData = request.getData();
            userId = commentData.getString("userId");
            ideaId = commentData.getString("ideaId");
            commentText = commentData.getString("text");
        } catch (Exception ex) {
            response.setErrorMessage("SIdeaDetails_saveCommentData_error");
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
                    "SIdeaDetails_saveCommentGetDBObjects_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Abrufen des Ideeobjekts aus der DB ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        currentComment = new Comment();
        currentComment.setUserId(userId);
        currentComment.setText(commentText);

        currentIdea.getComments().add(currentComment);

        JSONObject respData = new JSONObject();
        try {

            ideaController.updateIdea(currentIdea);

            response.setResult("success");
            respData.put("idea", JSONBuilder.getIdeaDetailsJSONObject(currentIdea));
            response.setData(respData);
            return response;

        } catch (Exception ex) {
            response.setErrorMessage("SIdeaDetails_CommentSaveData_error");
            response.setResult("error");
            log.log(Level.SEVERE,
                    "Beim Speichern der Daten einer Like/Follow Aktion ist ein Fehler aufgetreten!"
                            + "\nFehlermeldung: " + ex.getMessage());
            return response;
        }
    }
}
