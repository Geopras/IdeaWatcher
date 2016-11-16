package main.java.de.ideaWatcher.webApi.core;

import org.json.JSONObject;

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
     * @return {JSONObject} Daten-JSON-Objekt
     */
    JSONObject getData();

    /**
     * Legt die zu uebermittelnden Daten fest
     * @param data {JSONObject} Daten-JSON-Objekt
     */
    void setData(JSONObject data);

    /**
     * Gibt Fehlernachricht zurueck
     * @return {String} Fehlernachricht
     */
    String getErrorMessage();

    /**
     * Legt die zu uebermittelnde Fehlernachricht ueber einen Identifier fest
     * @param errorMessage {String} Identifier fuer Fehlernachricht
     */
    void setErrorMessage(String errorMessage);

    /**
     * Prueft, ob Response-Objekt bereits einen Token hat
     * @return {boolean} TRUE, wenn ein Token definiert ist
     */
    boolean hasToken();

    /**
     * Legt den User-Token fest
     * @param token {String}
     */
    void setToken(String token);

    /**
     * Gibt die UserID zurueck
     * @return {String} UserID
     */
    String getUserId();

    /**
     * Legt die UserID fest
     * @param userId {String} UserID
     */
    void setUserId(String userId);

    /**
     * Konvertiert das Java-Objekt in ein JSON-Objekt
     * @return {JSONObject} JSON-Objekt
     */
    JSONObject toJSONObject();
}
