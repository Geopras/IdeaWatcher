package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Workflow zum Anzeigen des Benutzerprofils
 */
public class GetProfileWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( LoginWorkflow.class.getName() );
    private IUserController user;

    public GetProfileWorkflow() {

        this.user = InstanceManager.getDataManager().getUserController();
    }

    @Override
    public IResponse getResponse(IRequest request) {

        // Die UserID der Anfrage zur Abfrage der Datenbank:
        String userId = request.getUserId();

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        //region Den zur Request-UserID zugehoerigen User in DB abfragen
        IUser foundUser;
        try {
            foundUser = this.user.getUser(userId);
            response.setResult("success");
            response.setData(this.userDataToJSONObject(foundUser));
            return response;
        } catch (Exception ex) {
            response.setErrorMessage("SProfile_getUser_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Abfrage eines bestimmten User aus " +
                    "der Datenbank ist ein Fehler " +
                    "aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }
        //endregion
    }

    private JSONObject userDataToJSONObject(IUser user) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userName", user.getUserName());
        jsonObject.put("email", user.getEmail());
        jsonObject.put("isMailPublic", user.getIsMailPublic());
        jsonObject.put("surname", user.getSurname());
        jsonObject.put("firstName", user.getFirstname());
        jsonObject.put("gender", user.getGender());
        jsonObject.put("language", user.getLanguage());
        return jsonObject;
    }

}
