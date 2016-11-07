package main.java.de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

/**
 * Interface zur Implementierung einer Response-Klasse
 */
public interface IResponse {

    /**
     * Legt das Ziel der Antwortnachricht fest
     * @param destination {String} eindeutige Zieladresse der Antwort
     */
    void setDestination(String destination);

    /**
     * Gibt das Ergebnis zurueck, das von der Antwort uebermittelt werden soll
     * @return {String} Ergebnis
     */
    String getResult();

    /**
     * Legt das Ergebnis der Antwort fest
     * @param result {String} Ergebnis
     */
    void setResult(String result);

    /**
     * Gibt die zu uebermittelnden Daten zurueck
     * @return {JsonObject} Daten-JSON-Objekt
     */
    JsonObject getData();

    /**
     * Legt die zu uebermittelnden Daten fest
     * @param data {JsonObject} Daten-JSON-Objekt
     */
    void setData(JsonObject data);

    /**
     * Legt die zu uebermittelnde Fehlernachricht ueber einen Identifier fest
     * @param errorMessage {String} Identifier fuer Fehlernachricht
     */
    void setErrorMessage(String errorMessage);

    /**
     * Konvertiert das Java-Objekt in ein JSON-Objekt
     * @return {JsonObject} JSON-Objekt
     */
    JsonObject toJsonObject();
}
