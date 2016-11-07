package main.java.de.ideaWatcher.webApi.core;

import javax.json.Json;
import javax.json.JsonObject;

/**
 * Klasse zur Erzeugung einer Antwort-Nachricht als Ergebnis eines Workflow
 */
public class Response implements IResponse {

    private String destination;
    private String result;
    private JsonObject data;
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
    public JsonObject getData() {
        return data;
    }

    @Override
    public void setData(JsonObject data) {
        this.data = data;
    }

    @Override
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    @Override
    public void setToken(Long token) {

    }

    /**
     * Erzeugt eine leere Response-Instanz
     */
    public Response() {
        this.destination = "";
        this.result = "";
        this.data = null;
        this.errorMessage = "";
    }

    /**
     * Erzeugt eine gefuellte Response-Instanz
     * @param destination {String} Zieladresse der Antwort im Frontend
     * @param result {String} zu uebermittelndes Ergebnis
     * @param data {JsonObject} zu uebermittelnde Daten
     * @param errorMessage {String} Fehlernachricht
     */
    public Response(String destination, String result, JsonObject data,
                     String errorMessage) {
        this.destination = destination;
        this.result = result;
        this.data = data;
        this.errorMessage = errorMessage;
    }
    
    public JsonObject toJsonObject() {
        return Json.createObjectBuilder()
                .add("destination", this.destination)
                .add("result", this.result)
                .add("data", this.data)
                .add("error", this.errorMessage)
                .build();
    }
}
