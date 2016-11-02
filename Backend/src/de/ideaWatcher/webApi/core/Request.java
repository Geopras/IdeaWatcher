package de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung einer Antwort-Nachricht als Ergebnis eines Workflow
 */
public class Request {

    private String destination;
    private JsonObject data;
    private String token;
    private int userId;

    public String getDestination() {
        return this.destination;
    }

    public JsonObject getData() {
        return this.data;
    }

    public String getToken() {
        return this.token;
    }

    public int getUserId() {
        return this.userId;
    }

    public Request() {
        this.destination = "";
        this.data = null;
        this.token = "";
        this.userId = -1;
    }

    public void convertToJava(JsonObject request) {
        this.destination = request.getString("destination");
        this.data = request.getJsonObject("data");
        this.token = request.getString("token");
        this.userId = request.getInt("userId");
    }




}
