package de.ideaWatcher.webApi.core;

import javax.json.Json;
import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung einer Antwort-Nachricht als Ergebnis eines Workflow
 */
public class Response {

    private String destination;
    private String result;
    private String token;
    private int userId;
    private String errorMessage;

    public Response() {
        this.destination = "";
        this.result = "";
        this.token = "";
        this.userId = -1;
        this.errorMessage = "";
    }

    public void initialize(String destination, String result, String token, int
            userId, String errorMessage) {
        this.destination = destination;
        this.result = result;
        this.token = token;
        this.userId = userId;
        this.errorMessage = errorMessage;
    }

    public void initialize(String destination, String result, String errorMessage) {
        this.destination = destination;
        this.result = result;
        this.errorMessage = errorMessage;
    }
    
    public JsonObject convertToJson() {
        return Json.createObjectBuilder()
                .add("destination", this.destination)
                .add("result", this.result)
                .add("token", this.token)
                .add("userId", this.userId)
                .add("error", this.errorMessage)
                .build();
    }


}
