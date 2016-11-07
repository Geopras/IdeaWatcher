package de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

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
    JsonObject getData();

    /**
     * Gibt Anfrage-Token zurueck
     * @return {Long} token
     */
    int getToken();

    /**
     * Gibt User ID zurueck
     * @return {Long} user id
     */
    int getUserId();
}
