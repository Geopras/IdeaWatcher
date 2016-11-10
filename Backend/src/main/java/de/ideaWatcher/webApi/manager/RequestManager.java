package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.common.CommandMap;
import main.java.de.ideaWatcher.common.JsonService;
import main.java.de.ideaWatcher.webApi.command.LoginCommand;
import main.java.de.ideaWatcher.webApi.command.SignupCommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Request;
import main.java.de.ideaWatcher.webApi.core.Response;
import org.json.JSONObject;


/**
 * Dieser Manager soll einen empfangenen JSON-String-Request behandeln.
 */
public class RequestManager {

    private CommandMap<IRequest, IResponse> workflowMapping;
    private TokenManager tokenManager;

    /**
     * Erstellt eine neue Instanz des RequestManager
     */
    public RequestManager() {

        this.workflowMapping = new CommandMap();
        this.tokenManager = new TokenManager();
    }

    /**
     * Erstelle Mapping von Workflownamen zu entsprechenden Commands, die
     * jeweils einen Workflow starten.
     * Der Key ist das Ziel, das mit der Request-Eigenschaft "destination"
     * angegeben wird.
     */
    public void initialize() {
        initializeCommandMap();
    }

    private void initializeCommandMap() {

        this.workflowMapping.addCommand("SLogin/validateRequest",
                new LoginCommand());
        this.workflowMapping.addCommand("SSignup/addUserRequest",
                new SignupCommand());
    }

    /**
     * Behandelt einen JSON-String-Request vom Frontend ueber einen zugehoerigen
     * Workflow und gibt das Ergebnis zurueck.
     *
     * @param request {String} Request als JSON-String
     * @return {String} Antwort zum Request als JSON-String
     */
    public String getResponse(String request) throws Exception {

        //region Request-JSON-String in Javaobjekt umwandeln
        IRequest requestObject;
        try {
            requestObject = toRequest(request);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
        //endregion

        IResponse response = new Response();

        //region Token-Validierung

        // Workflow soll nicht starten, wenn Token nicht valide
        boolean shouldStartWorkflow = true;

        if (requestObject.getDestination().startsWith("SLogin")) {

            // Wenn Login-Request, dann neuen Token generieren
            response.setToken(this.tokenManager.generateToken());

        } else if (!requestObject.getDestination().startsWith("SSignup")) {

            // Wenn kein Signup-Request, dann Token validieren
            if (!this.tokenManager.existsToken(requestObject.getToken())) {

                // Wenn Token nicht gueltig, dann Antwort mit Fehlernachricht
                // zurueckschicken
                response.setErrorMessage("SSignup/token_not_valid");
                shouldStartWorkflow = false;
            }
        }
        //endregion

        //region zugehoerigen Workflow ausfuehren und Antwort ermitteln
        if (shouldStartWorkflow) {
            try {
                // Angefragten Workflow ausfuehren
                IResponse workFlowResponse = this.workflowMapping.executeCommand
                        (requestObject
                        .getDestination(), requestObject);
                response.setResult(workFlowResponse.getResult());
                if (workFlowResponse.getData() == null) {
                }
                response.setData(workFlowResponse.getData());
                response.setErrorMessage(workFlowResponse.getErrorMessage());

            } catch (Exception ex) {
                throw new Exception(ex);
            }
        }
        //endregion

        //region Response-Objekt mit Ziel und Token versehen
        if (!response.hasToken()) {  // Wenn kein Token zuvor generiert

            response.setToken(requestObject.getToken());
        }
        response.setDestination(requestObject.getDestination() + "-response");
        //endregion

        //region Response-Javaobjekt als JSON-String zurueckgeben
        JSONObject responseJson = response.toJSONObject();
        return responseJson.toString();
        //endregion
    }

    private IRequest toRequest(String requestString) throws Exception {

        //JSON-String-Request in Request-Javaobjekt umwandeln
        JSONObject requestJson;
        try {
            requestJson = JsonService.toJSONObject(requestString);
        } catch (Exception ex) {
            throw new Exception("Fehler beim Konvertieren eines " +
                    "Request-Strings in ein JsonObject!\nFehlermeldung: " + ex);
        }

        try {
            String requestDestination = requestJson.getString("destination");
            JSONObject requestData = requestJson.getJSONObject("data");
            String requestToken = requestJson.getString("token");
            
            return new Request(requestDestination, requestData, requestToken);

        } catch (NullPointerException ex) {
            throw new Exception("Fehler beim Extrahieren der Eigenschaften " +
                    "des Requests! Es sind nicht alle notwendigen " +
                    "Eigenschaften vorhanden (destination, data, token)");
        } catch (ClassCastException ex) {
            throw new Exception("Fehler beim Extrahieren der Eigenschaften " +
                    "des Requests! Der Request-String hat kein korrektes " +
                    "JSON-Format!");
        }
    }
}
