package de.ideaWatcher.webApi.core;

import javax.json.Json;
import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung einer Antwort-Nachricht als Ergebnis eines Workflow
 */
public class Response {

    private String destination;
    private String result;
    private Long token;
    private Long userId;
    private String errorMessage;

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getResult() {
        return this.result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public void setToken(Long token) {
        this.token = token;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Response() {
        this.destination = "";
        this.result = "";
        this.token = new Long(-1);
        this.userId = new Long(-1);
        this.errorMessage = "";
    }

    public void initialize(String destination, String result, Long token, Long
            userId, String errorMessage) {
        this.destination = destination;
        this.result = result;
        this.token = token;
        this.userId = userId;
        this.errorMessage = errorMessage;
    }
    
    public JsonObject toJsonObject() {
        return Json.createObjectBuilder()
                .add("destination", this.destination)
                .add("result", this.result)
                .add("token", this.token.toString())
                .add("userId", this.userId.toString())
                .add("error", this.errorMessage)
                .build();
    }


}
