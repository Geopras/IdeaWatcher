package main.java.de.ideaWatcher.webApi.core;

import org.json.JSONObject;

/**
 * Klasse zur Erzeugung eines Request-Javaobjekts
 */
public class Request implements IRequest {

    private String destination;
    private JSONObject data;
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
    public String getToken() {
        return this.token;
    }

    /**
     * Gibt neue Instanz der Klasse Request zurueck
     * @param destination {String} Ziel der Anfrage
     * @param data {JSONObject} Die Daten der Anfrage als JsonObject
     * @param token {String} User-Token
     * @return {IRequest} Request-Objekt
     */
    public Request(String destination, JSONObject data, String token) {
        this.destination = destination;
        this.data = data;
        this.token = token;
    }
}