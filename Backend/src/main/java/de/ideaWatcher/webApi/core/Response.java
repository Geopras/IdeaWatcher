package main.java.de.ideaWatcher.webApi.core;

import org.json.JSONObject;

/**
 * Klasse zur Erzeugung einer Antwort-Nachricht als Ergebnis eines Workflow
 */
public class Response implements IResponse {

    private String destination;
    private String token;
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
    public void setToken(String token) {
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
    public Response(String destination, String token, String result, JSONObject
            data, String errorMessage) {
        this.destination = destination;
        this.token = token;
        this.result = result;
        this.data = data;
        this.errorMessage = errorMessage;
    }
    
    public JSONObject toJSONObject() {
        JSONObject jsonObject =  new JSONObject()
                .put("destination", this.destination)
                .put("token", this.token)
                .put("result", this.result)
                .put("data", this.data)
                .put("error", this.errorMessage);
        return jsonObject;
    }
}
