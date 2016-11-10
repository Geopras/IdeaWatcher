package main.java.de.ideaWatcher.webApi.core;

import org.json.JSONObject;

/**
 * Interface zur Erstellung einer Request-Klasse
 */
public interface IRequest {

    /**
     * Gibt das Ziel der Anfrage zurueck
     * @return {String} Ziel der Anfrage
     */
    String getDestination();

    /**
     * Gibt Daten zur Anfrage zurueck
     * @return {JsonObject} Daten
     */
    JSONObject getData();

    /**
     * Gibt Anfrage-Token zurueck
     * @return {Long} token
     */
    Long getToken();
}
