package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.common.CommandMap;
import main.java.de.ideaWatcher.webApi.commands.LoginCommand;
import main.java.de.ideaWatcher.webApi.commands.SignupCommand;

import javax.json.JsonObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;

/**
 * Dieser Service soll einen empfangenen JSON-String-Request in ein Java-Objekt
 * umwandeln, an den entsprechenden Workflow weiterleiten und das Ergebnis
 * als JSON-String zurueckgeben.
 */
public class RequestManager {

    private static final Logger log = Logger.getLogger( RequestManager.class.getName() );
    private CommandMap<IRequest, IResponse> workflowMapping;
    private List<Long> tokens;

    /**
     * Create a new instance of RequestManager for managing incoming Requests
     */
    public RequestManager() {

        this.workflowMapping = new CommandMap();
        this.tokens = new ArrayList<>();
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

        if (this.isRequestToAuthenticate(requestObject)) {

        } else {

        }

        IResponse responseObject = new Response();

        //region zugehoerigen Workflow ausfuehren und Antwort ermitteln
        try {
            // Angefragten Workflow ausfuehren
            responseObject = this.workflowMapping.executeCommand(requestObject
                            .getDestination(), requestObject);
        } catch (Exception ex) {
            responseObject.setErrorMessage(ex.getMessage());
        }
        //endregion

        responseObject.setDestination(requestObject.getDestination() + "-response");
        responseObject.setToken(requestObject.getToken());

        //region Response-Javaobjekt als JSON-String rausgeben
        JsonObject responseJson = responseObject.toJsonObject();
        return responseJson.toString();
        //endregion
    }

    private IRequest toRequest(String requestString) throws Exception {

        //JSON-String-Request in Request-Javaobjekt umwandeln
        JsonObject requestJson;
        try {
            requestJson = JsonConverter.convertToJsonObject(requestString);
        } catch (Exception ex) {
            throw new Exception("Fehler beim Konvertieren eines " +
                    "Request-Strings in ein JsonObject!\nFehlermeldung: " + ex);
        }

        try {
            String requestDestination = requestJson.getString("destination");
            JsonObject requestData = requestJson.getJsonObject("data");
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

    private boolean isRequestToAuthenticate(IRequest request) {

        // Prüft, ob der Request authentifiziert werden muss:
        if (request.getDestination().startsWith("SLogin") ||
                !request.getDestination().startsWith("SSignup")) {
            return false;
        } else {
            return true;
        }
    }

    private IResponse setResponseToken(IResponse response) {

        Long newToken = this.generateToken();
        response.setToken(newToken);
        this.tokens.add(newToken);  //
        return response;
    }

    private boolean isAuthenticated(IRequest request) {

        // User-Authentifizierung (Token-Prüfung)
        if (this.tokens.contains(request.getToken())) {
            return true;
        } else {
            return false;
        }
    }

    private Long generateToken() {

        //region Wenn noch kein Token vorhanden, dann bei 1 beginnen
        if (this.tokens.size() == 0) {
            // mit 1 beginnen:
            return new Long(1);
        }
        //endregion

        //region Wenn Tokens vorhanden, dann Maximalwert + 1 nehmen
        Comparator<Long> cmp = (o1, o2) -> Long.valueOf(o1).compareTo(Long
                .valueOf(o2));
        return new Long(Collections.max(this.tokens, cmp).toString() + 1);
        //endregion
    }
}
