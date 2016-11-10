package main.java.de.ideaWatcher.common;

import org.json.JSONObject;

/**
 * Klasse zur Konvertierung von JSON-String in ein Java-Objekt
 * bzw. umgekehrt
 */
public class JsonService {

    /**
     * Statische Methode, die einen JSON-String in ein JSONObject umwandelt
     * @param jsonString
     * @return
     */
    public static JSONObject toJSONObject(String jsonString) throws Exception {

        try {
            return new JSONObject(jsonString);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }
}
