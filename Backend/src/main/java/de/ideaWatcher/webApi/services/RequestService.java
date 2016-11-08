package main.java.de.ideaWatcher.webApi.services;

import main.java.de.ideaWatcher.common.CommandMap;
import main.java.de.ideaWatcher.webApi.commands.LoginCommand;
import main.java.de.ideaWatcher.webApi.commands.SignupCommand;
import main.java.de.ideaWatcher.webApi.core.*;

import javax.json.Json;
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
public class RequestService {

    private static final Logger log = Logger.getLogger( RequestService.class.getName() );
    private CommandMap<IRequest, IResponse> workflowMapping;
    private List<Long> tokens;

    /**
     * Create a new instance of RequestService for managing incoming Requests
     */
    public RequestService() {

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
    public String getResponse(String request) {

        //region JSON-String-Request in Request-Javaobjekt umwandeln
        JsonObject requestJson = JsonConverter.convertToJsonObject(request);
        IRequest requestObject = new Request(requestJson);
        //endregion


        IResponse responseObject = new Response();

        //region Token-Authentifizierung:
        // Wenn Login- oder Signup-Request, dann Token generieren
        if (requestObject.getDestination().startsWith("SLogin") ||
                !requestObject.getDestination().startsWith("SSignup")) {
            this.generateToken();
        } else { // Wenn kein Login/Signup, dann Token prüfen

        }

        //endregion

        //region zugehoerigen Workflow ausfuehren und Antwort ermitteln
        try {
            // Angefragten Workflow ausfuehren
            responseObject = this.workflowMapping.executeCommand(requestObject
                            .getDestination(), requestObject);
        } catch (Exception ex) {
            responseObject.setErrorMessage(ex.getMessage());
        }
        //endregion

        //region Wenn Login korrekt, dann Token generieren
        if (requestObject.getDestination().equals("SLogin/validate") &&
                responseObject.getResult().equals("valid")) {
            Long newToken = generateToken();
            this.tokens.add(newToken);
            // neuen Token zu responseObject hinzufügen
            JsonObject data = responseObject.getData();
            JsonObject newData = Json.createObjectBuilder()
                    .add("userId", data.getString("userId"))
                    .add("token", newToken).build();
            responseObject.setData(newData);
        }
        //endregion

        responseObject.setDestination(requestObject.getDestination() + "-response");

        //region Response-Javaobjekt als JSON-String rausgeben
        JsonObject responseJson = responseObject.toJsonObject();
        return responseJson.toString();
        //endregion
    }

    private boolean isAuthenticated(IRequest request) {

        // User-Authentifizierung (Token-Prüfung)
        Long token = request.getToken();
        if (this.tokens.contains(token)) {
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
        return new Long(Collections.max(this.tokens, cmp)
                .toString() + 1);
        //endregion
    }
}
