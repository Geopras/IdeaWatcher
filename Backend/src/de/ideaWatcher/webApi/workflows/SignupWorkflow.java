package de.ideaWatcher.webApi.workflows;

import javax.json.JsonObject;

import de.ideaWatcher.dataManager.DataManager;
import de.ideaWatcher.webApi.core.IWorkflow;
import de.ideaWatcher.webApi.core.Request;
import de.ideaWatcher.webApi.core.Response;

/**
 * Workflow zur Registrierung eines Nutzers
 */
public class SignupWorkflow implements IWorkflow {

    private DataManager dataManager;
    private Request request;
    private Response response;
    private String errorMessage;
    private String result;

    /**
     * Instanziiere SignupWorkflow-Objekt zur Registrierung
     */
    public SignupWorkflow(DataManager dataManager) {

        this.dataManager = dataManager;
        this.request = new Request();
        this.response = new Response();
        this.errorMessage = "";
        this.result = "";
    }

    /**
     * Fuehre den Workflow aus und gib das Ergebnis als Response-Objekt zurueck.
     * 
     * @return {JsonObject} JSON-String als Ergebnis des Workflow
     */
    public JsonObject getResponse(JsonObject request) {

        dataManager = new DataManager();
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

        JsonObject signupData = this.request.getData();
        String userName = signupData.getString("username");
        String email = signupData.getString("email");
        String password = signupData.getString("password");

        // region wenn User nicht existiert, muss er angelegt werden
        if (!dataManager.existsUser(userName)) {
            // user muss angelegt werden
            try {
                dataManager.addUser(userName, email, password);
                this.result = "valid";
            } catch (Exception e) {
                // wenn Fehler auftreten, dann wird eine zugehoerige Nachricht
                // in
                // // this.errorMessage gespeichert
                this.errorMessage = String.format("Ssignup/user_signup_failed",
                        userName);
                this.result = "notvalid";
                e.printStackTrace();
            }

        } else {
            // User bekommt eine Fehlermeldung auf der View
            this.errorMessage = String.format("Ssignup/username_already_exists",
                    userName);
            this.result = "notvalid";
        }
        // end region
    }

    //
    // /**
    // * Initialisiere das Response-Objekt anhand des Workflow-Ergebnisses
    // */
    private void initializeResponse() {

        String destination = this.request.getDestination() + "-response";
        this.response.initialize(destination, this.result, this.errorMessage);
    }
}
