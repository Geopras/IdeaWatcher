package de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung eines Request-Javaobjekts
 */
public class Request {

    private String destination;
    private JsonObject data;
    private int token;
    private int userId;

    public String getDestination() {
        return this.destination;
    }

    public JsonObject getData() {
        return this.data;
    }

    public int getToken() {
        return this.token;
    }

    public int getUserId() {
        return this.userId;
    }

    public Request(String destination, JsonObject data, int token, int userId) {
        this.destination = destination;
        this.data = data;
        this.token = token;
        this.userId = userId;
    }

    public Request(JsonObject requestJson) {
        this.destination = requestJson.getString("destination");
        this.data = requestJson.getJsonObject("data");
        this.token = requestJson.getInt("token");
        this.userId = requestJson.getInt("userId");
    }
}
