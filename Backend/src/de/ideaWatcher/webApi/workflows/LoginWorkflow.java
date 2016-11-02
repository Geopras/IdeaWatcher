package de.ideaWatcher.webApi.workflows;

import de.ideaWatcher.webApi.core.IWorkflow;
import de.ideaWatcher.webApi.core.Request;
import de.ideaWatcher.webApi.core.Response;
import de.ideaWatcher.webApi.model.User;

import javax.json.JsonObject;

/**
 * Workflow zur Validierung eines Login-Versuchs
 */
public class LoginWorkflow implements IWorkflow {

    private Request request;
    private Response response;
    private String errorMessage;
    private String result;

    /**
     * Instanziiere LoginWorkflow-Objekt zur Validierung eines Login-Versuchs
     */
    public LoginWorkflow() {

        this.request = new Request();
        this.response = new Response();
        this.errorMessage = "";
        this.result = "";
    }

    /**
     * Fuehre den Workflow aus und gib das Ergebnis als Response-Objekt zurueck.
     * @return {JsonObject} JSON-String als Ergebnis des Workflow
     */
    public JsonObject getResponse(JsonObject request) {

        // Konvertiere Request-JsonObject zu Request-JavaObject
        this.request.convertToJava(request);
        this.execute();
        this.initializeResponse();
        return this.response.convertToJson();
    }

    /**
     * Fuehre den Workflow aus und speichere das Ergebnis bzw. Fehler
     */
    private void execute() {

        JsonObject loginData = this.request.getData();
        String userId = loginData.getString("userId");
        String username = loginData.getString("username");
        String password = loginData.getString("password");

        //TODO: Hashwert zu Passwort bestimmen

        User foundUser = getUser(userId);

        //region Validierungslogik
        if (userId.equals(foundUser.getUserId())) {
            if (password.equals(foundUser.getPassword())) {
                this.result = "valid";
            }
            // wenn Fehler auftreten, dann wird eine zugehoerige Nachricht in
            // this.errorMessage gespeichert
            this.errorMessage = String.format
                    ("Slogin/password_not_valid",
                    username);
        } else {
            this.errorMessage = String.format
                    ("Slogin/username_not_exists",
                    username);
        }
        this.result = "notvalid";
        //endregion
    }

    /**
     * Finde den zum Login-Versuch zugehoerigen User durch den DataManager
     * @return {User} gefundenen User
     */
    private User getUser(String username) {

        // TODO: Suche den zu validierenden User heraus
        return new User();
    }

    /**
     * Initialisiere das Response-Objekt anhand des Workflow-Ergebnisses
     */
    private void initializeResponse() {

        String destination = this.request.getDestination() + "-response";
        this.response.initialize(destination, this.result,
                this.request.getToken(), this.request.getUserId(), this.errorMessage);
    }
}
