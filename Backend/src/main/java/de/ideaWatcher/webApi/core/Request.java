package main.java.de.ideaWatcher.webApi.core;

import org.json.JSONObject;

/**
 * Klasse zur Erzeugung eines Request-Javaobjekts
 */
public class Request implements IRequest {

    private String destination;
    private JSONObject data;
    private String userId;
    private String token;

    @Override
    public String getDestination() {
        return this.destination;
    }

    @Override
    public JSONObject getData() {
        return this.data;
    }

    @Override
    public String getUserId() {
        return this.userId;
    }

    @Override
    public String getToken() {
        return this.token;
    }

    /**
     * Gibt neue Instanz der Klasse Request zurueck
     * @param destination {String} Ziel der Anfrage
     * @param data {JSONObject} Die Daten der Anfrage als JsonObject
     * @param userId {String} User-ID
     * @param token {String} User-Token
     * @return {IRequest} Request-Objekt
     */
    public Request(String destination, JSONObject data, String userId, String
                   token) {
        this.destination = destination;
        this.data = data;
        this.userId = userId;
        this.token = token;
    }
}
