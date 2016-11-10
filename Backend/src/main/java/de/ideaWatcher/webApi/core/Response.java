package main.java.de.ideaWatcher.webApi.core;

import org.json.JSONObject;

/**
 * Klasse zur Erzeugung einer Antwort-Nachricht als Ergebnis eines Workflow
 */
public class Response implements IResponse {

    private String destination;
    private Long token;
    private String result;
    private JSONObject data;
    private String errorMessage;

    @Override
    public void setDestination(String destination) {
        this.destination = destination;
    }

    @Override
    public String getResult() {
        return this.result;
    }

    @Override
    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public JSONObject getData() {
        return this.data;
    }

    @Override
    public void setData(JSONObject data) {
        this.data = data;
    }

    @Override
    public String getErrorMessage() {
        return this.errorMessage;
    }

    @Override
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    @Override
    public boolean hasToken() {
        return this.token != null;
    }

    @Override
    public void setToken(Long token) {
        this.token = token;
    }

    /**
     * Erzeugt eine leere Response-Instanz
     */
    public Response() {
        this.destination = "";
        this.result = "";
        this.data = null;
        this.errorMessage = "";
        this.token = null;
    }

    /**
     * Erzeugt eine gefuellte Response-Instanz
     * @param destination {String} Zieladresse der Antwort im Frontend
     * @param token {Long} User-Token
     * @param result {String} zu uebermittelndes Ergebnis
     * @param data {JsonObject} zu uebermittelnde Daten
     * @param errorMessage {String} Fehlernachricht
     */
    public Response(String destination, Long token, String result, JSONObject
            data, String errorMessage) {
        this.destination = destination;
        this.token = token;
        this.result = result;
        this.data = data;
        this.errorMessage = errorMessage;
    }
    
    public JSONObject toJSONObject() {
        return new JSONObject()
                .append("destination", this.destination)
                .append("token", this.token)
                .append("result", this.result)
                .append("data", this.data)
                .append("error", this.errorMessage);
    }
}
