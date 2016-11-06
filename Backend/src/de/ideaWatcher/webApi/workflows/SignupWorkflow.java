package de.ideaWatcher.webApi.workflows;

import de.ideaWatcher.dataManager.DataManager;
import de.ideaWatcher.webApi.core.IWorkflow;
import de.ideaWatcher.webApi.core.Request;
import de.ideaWatcher.webApi.core.Response;

import javax.json.JsonObject;

/**
 * Workflow zur Registrierung eines Nutzers
 */
public class SignupWorkflow implements IWorkflow {

    private Request request;
    private Response response;
    private String errorMessage;
    private String result;

    /**
     * Instanziiere SignupWorkflow-Objekt zur Registrierung
     */
    public SignupWorkflow() {

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
        boolean existsUser = false;
        try {
            existsUser = DataManager.existsUser(userName);
        } catch (Exception ex) {
            //TODO Fehler rausgeben
        }
        if (!existsUser) {
            // user muss angelegt werden
            try {
                DataManager.addUser(userName, email, password);
                this.result = "ok";
            } catch (Exception e) {
                // wenn Fehler auftreten, dann wird eine zugehoerige Nachricht
                // in
                // // this.errorMessage gespeichert
                this.errorMessage = String.format("SSignup/user_signup_failed",
                        userName);
                this.result = "notok";
                e.printStackTrace();
            }
        } else {
            // User bekommt eine Fehlermeldung auf der View
            this.errorMessage = String.format("SSignup/username_already_exists",
                    userName);
            this.result = "notok";
        }
        // end region
    }

    
     /**
     * Initialisiere das Response-Objekt anhand des Workflow-Ergebnisses
     */
    private void initializeResponse() {

        String destination = this.request.getDestination() + "-response";
        this.response.initialize(destination, this.result, this.errorMessage);
    }
}
