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

        this.user = InstanceManager.getDataManager().getInstanceUser();
    }

    @Override
    public IResponse getResponse(IRequest data) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        //region Anhand Request-Token den Username vom TokenManager holen
        String userName;
        try {
            userName = InstanceManager.getTokenManager().getTokenValue
                    (data.getToken());
        } catch (Exception ex) {
            response.setErrorMessage("SProfile_tokenNotFound_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Zuordnung des " +
                    "Request-Tokens zu einem Username ist " +
                    "ein Fehler aufgetreten!\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }
        //endregion

        //region Anfrage an DataManager stellen, um den zum Usernamen
        // zugehoerigen User zu bekommen
        IUser foundUser;
        try {
            foundUser = this.user.getUser(userName);
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
