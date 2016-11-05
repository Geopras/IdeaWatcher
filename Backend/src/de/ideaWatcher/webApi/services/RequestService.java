package de.ideaWatcher.webApi.services;

import de.ideaWatcher.common.CommandMap;
import de.ideaWatcher.webApi.commands.LoginCommand;
import de.ideaWatcher.webApi.commands.SignupCommand;
import de.ideaWatcher.webApi.core.JsonConverter;

import javax.json.Json;
import javax.json.JsonObject;

/**
 * Dieser Service soll einen empfangenen JSON-String-Request in ein Java-Objekt
 * umwandeln, an den entsprechenden Workflow weiterleiten und das Ergebnis
 * als JSON-String zurueckgeben.
 */
public class RequestService {

    private CommandMap workflowMapping;

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
        this.workflowMapping = new CommandMap();
        this.workflowMapping.addCommand("SLogin/validateRequest", new LoginCommand());
        this.workflowMapping.addCommand("SSignup/addUserRequest", new SignupCommand());
    }



    /**
     * Behandelt einen JSON-String-Request vom Frontend ueber einen zugehoerigen
     * Workflow und gibt das Ergebnis zurueck.
     * @param request {String} Request als JSON-String
     * @return {String} Antwort zum Request als JSON-String
     */
    public String getResponse(String request) {

        JsonObject requestObject = JsonConverter.convertToJsonObject(request);
        String destination = requestObject.getString("destination");

        JsonObject response;
        try {
            response = (JsonObject) workflowMapping.executeCommand(destination,
                    requestObject);
        } catch (Exception ex) {
            response = Json.createObjectBuilder()
                    .add("error", ex.getMessage()).build();
        }
        return response.toString();
    }
}
