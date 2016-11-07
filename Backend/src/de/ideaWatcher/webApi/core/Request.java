package de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung eines Request-Javaobjekts
 */
public class Request implements IRequest {

    private String destination;
    private JsonObject data;
    private int token;
    private int userId;

    @Override
    public String getDestination() {
        return this.destination;
    }

    @Override
    public JsonObject getData() {
        return this.data;
    }

    @Override
    public int getToken() {
        return this.token;
    }

    @Override
    public int getUserId() {
        return this.userId;
    }

    /**
     * Gibt neue Instanz der Klasse Request zurueck
     * @param destination {String} Ziel der Anfrage
     * @param data {JsonObject} Daten zur Anfrage
     * @param token {Long} Token der Benutzersession
     * @param userId {Long} User ID des Benutzers
     * @return {IRequest} Request-Objekt
     */
    public Request(String destination, JsonObject data, int token, int
            userId) {
        this.destination = destination;
        this.data = data;
        this.token = token;
        this.userId = userId;
    }

    /**
     * Gibt neue Instanz der Klasse Request zurueck
     * @param requestJson {JsonObject} Die Anfrage als JsonObject
     * @return {IRequest} Request-Objekt
     */
    public Request(JsonObject requestJson) {
        this.destination = requestJson.getString("destination");
        this.data = requestJson.getJsonObject("data");
        this.token = requestJson.getInt("token");
        this.userId = requestJson.getInt("userId");
    }
}
