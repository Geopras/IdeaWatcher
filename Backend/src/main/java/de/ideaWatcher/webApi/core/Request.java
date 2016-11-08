package main.java.de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung eines Request-Javaobjekts
 */
public class Request implements IRequest {

    private String destination;
    private JsonObject data;
    private Long token;

    @Override
    public String getDestination() {
        return this.destination;
    }

    @Override
    public JsonObject getData() {
        return this.data;
    }

    @Override
    public Long getToken() {
        return this.token;
    }

    /**
     * Gibt neue Instanz der Klasse Request zurueck
     * @param destination {String} Ziel der Anfrage
     * @param data {JsonObject} Daten zur Anfrage
     * @param token {Long} Token der Benutzersession
     * @return {IRequest} Request-Objekt
     */
    public Request(String destination, JsonObject data, Long token) {
        this.destination = destination;
        this.data = data;
        this.token = token;
    }

    /**
     * Gibt neue Instanz der Klasse Request zurueck
     * @param requestJson {JsonObject} Die Anfrage als JsonObject
     * @return {IRequest} Request-Objekt
     */
    public Request(JsonObject requestJson) {
        this.destination = requestJson.getString("destination");
        this.data = requestJson.getJsonObject("data");
        this.token = new Long(requestJson.getString("token"));
    }
}
