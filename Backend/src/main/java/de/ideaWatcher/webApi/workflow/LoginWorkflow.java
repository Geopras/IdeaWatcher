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
 * Workflow zur Validierung eines Login-Versuchs
 */
public class LoginWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( LoginWorkflow.class.getName() );
    private IUserController user;

    public LoginWorkflow() {

        this.user = InstanceManager.getDataManager().getUserController();
    }

    /**
     * Fuehre den Workflow aus und gib das Ergebnis als Response-Objekt zurueck.
     * @return {JsonObject} JSON-String als Ergebnis des Workflow
     */
    public IResponse getResponse(IRequest request) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        JSONObject loginData = request.getData();
        String username = loginData.getString("userName");
        String password = loginData.getString("password");

        //region anzumeldenden User vom DataManager anfragen
        String userId;
        IUser foundUser;
        try {
            userId = this.user.getUserId(username);
            foundUser = this.user.getUser(userId);
        } catch (Exception ex) {
            response.setErrorMessage("SLogin_getUser_error");
            response.setResult("notvalid");
            log.log(Level.SEVERE, "Bei der Abfrage eines bestimmten User aus " +
                    "der Datenbank ist ein Fehler " +
                    "aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }
        //endregion

        //region Validierungslogik
        // Wenn Passwort korrekt, UserID mit senden
        if (this.user.isCorrectPassword(password, foundUser.getPassword())) {
            response.setResult("valid");
            response.setUserId(foundUser.getUserId());
        } else {
            // Passwort nicht korrekt:
            response.setErrorMessage("SLogin_password_not_valid");
            response.setResult("notvalid");
        }
        //endregion

        return response;
    }
}
