package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.common.CommandMap;
import main.java.de.ideaWatcher.common.JsonService;
import main.java.de.ideaWatcher.webApi.command.*;
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

    /**
     * Erstellt eine neue Instanz des RequestManager
     */
    public RequestManager() {

        this.workflowMapping = new CommandMap();
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

        this.workflowMapping.addCommand("SLogin/loginRequest",
                new LoginCommand());
        this.workflowMapping.addCommand("SSignup/addUserRequest",
                new SignupCommand());
        this.workflowMapping.addCommand("SProfileEdit/validateAndSaveRequest",
                new ProfileEditCommand());
        this.workflowMapping.addCommand("SProfileEdit/getUserDataRequest",
                new GetProfileCommand());
        this.workflowMapping.addCommand("SIdeaList/getIdeasRequest",
                new GetIdeaListCommand());
        this.workflowMapping.addCommand("SIdea/getIdeaDetailsRequest",
                new GetIdeaDetailsCommand());
        this.workflowMapping.addCommand("SLogout/logoutRequest",
                new LogoutCommand());
        this.workflowMapping.addCommand("SIdeaDetails/LikeFollowIdeaRequest",
                new LikeFollowCommand());
        this.workflowMapping.addCommand("SIdeaDetails/saveCommentIdeaRequest",
                new SaveCommentCommand());
        this.workflowMapping.addCommand("SIdeaDetails/deleteCommentIdeaRequest",
                new DeleteCommentCommand());
        this.workflowMapping.addCommand("SIdeaList/deleteIdeaRequest",
                new DeleteIdeaCommand());
        this.workflowMapping.addCommand("SIdeaCreation/saveIdeaRequest",
                new AddIdeaCommand());
        this.workflowMapping.addCommand
                ("SIdeaCreation/getIdeaToEditRequest",
                new GetIdeaToEditCommand());
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

        // Workflow soll nicht starten, wenn Token nicht valide (Sofern keine
        // Signup- oder Login-Anfrage)
        boolean shouldStartWorkflow = true;

        if (!requestObject.getDestination().startsWith("SSignup") &&
                !requestObject.getDestination().startsWith("SLogin") &&
                !requestObject.getDestination().startsWith("SIdeaList") &&
                !requestObject.getDestination().startsWith("SIdea/getIdeaDetailsRequest")) {

            // Token validieren
            if (!InstanceManager.getTokenManager()
                    .validateToken(requestObject.getUserId(), requestObject.getToken())) {

                // Wenn Token nicht gueltig, dann Antwort mit Fehlernachricht
                // zurueckschicken
                response.setErrorMessage("token_not_valid");
                shouldStartWorkflow = false;
            }
        }
        //endregion

        //region zugehoerigen Workflow ausfuehren und Antwort ermitteln
        if (shouldStartWorkflow) {
            IResponse workFlowResponse;
            try {
                // Angefragten Workflow ausfuehren
                workFlowResponse = this.workflowMapping.executeCommand
                        (requestObject.getDestination(), requestObject);
            } catch (Exception ex) {
                throw new Exception(ex);
            }
            response.setUserId(workFlowResponse.getUserId());
            response.setResult(workFlowResponse.getResult());
            response.setData(workFlowResponse.getData());
            response.setErrorMessage(workFlowResponse.getErrorMessage());
        }
        //endregion

        //region Wenn Login-Response erfolgreich, dann Token generieren
        if (requestObject.getDestination().startsWith("SLogin") &&
                response.getResult().equals("valid")) {

            String userId = response.getUserId();
            // Wenn keine userId vom LoginWorkflow zurückgegeben wurde, dann
            // ist der Login-Versuch nicht erfolgreich
            if (userId == null) {
                response.setErrorMessage("SLogin_no_userId_found");
                response.setResult("notvalid");
            } else {
                // Wenn Login-Request, dann neuen Token generieren
                response.setToken(InstanceManager.getTokenManager()
                        .generateToken(userId));
            }
        }
        //endregion

        response.setDestination(requestObject.getDestination() + "-response");

        //region Response-Javaobjekt als JSON-String zurueckgeben
        JSONObject responseJson = response.toJSONObject();
        String responseString = responseJson.toString();
        return responseString;
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
            String requestUserId = "";
            String requestToken = "";
            if (!requestDestination.startsWith("SLogin") &&
                    !requestDestination.startsWith("SSignup")) {
                requestUserId = requestJson.getString("userId");
                requestToken = requestJson.getString("token");
            }
            
            return new Request(requestDestination, requestData,
                    requestUserId, requestToken);

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
