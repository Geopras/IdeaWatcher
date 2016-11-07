package main.java.de.ideaWatcher.webApi.workflows;

import main.java.de.ideaWatcher.dataManager.DataManager;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs.IUser;

import javax.json.JsonObject;

/**
 * Workflow zur Validierung eines Login-Versuchs
 */
public class LoginWorkflow implements IWorkflow {

    private IUserController user;

    public LoginWorkflow() {

        this.user = (new DataManager()).getInstanceUser();
    }

    /**
     * Fuehre den Workflow aus und gib das Ergebnis als Response-Objekt zurueck.
     * @return {JsonObject} JSON-String als Ergebnis des Workflow
     */
    public IResponse getResponse(IRequest request) {

        JsonObject loginData = request.getData();
        String username = loginData.getString("username");
        String password = loginData.getString("password");

        // Response-Objekt erstellen
        IResponse response = new Response();

        //region anzumeldenden User vom DataManager anfragen
        IUser foundUser;
        try {
            foundUser = this.user.getUser(username);
        } catch (Exception ex) {
            response.setErrorMessage("SLogin/username_not_exists");
            response.setResult("notvalid");
            return response;
        }
        //endregion

        //region Validierungslogik
        // Wenn Passwort korrekt:
        if (this.user.isCorrectPassword(password, foundUser.getPassword())) {
            response.setResult("valid");
        }
        // Passwort nicht korrekt:
        response.setErrorMessage("SLogin/password_not_valid");
        response.setResult("notvalid");
        //endregion

        return response;
    }
}
