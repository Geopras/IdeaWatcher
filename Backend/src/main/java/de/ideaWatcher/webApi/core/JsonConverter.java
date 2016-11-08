package main.java.de.ideaWatcher.webApi.core;

import javax.json.*;
import java.io.StringReader;

/**
 * Klasse zur Konvertierung von JSON-String in ein Java-Objekt
 * bzw. umgekehrt
 */
public class JsonConverter {

    /**
     * Statische Methode, die einen JSON-String in ein JsonObject umwandelt
     * @param jsonString
     * @return
     */
    public static JsonObject convertToJsonObject(String jsonString) throws Exception {

        try {
            JsonReader jsonReader = Json.createReader(new StringReader(jsonString));
            return jsonReader.readObject();
        } catch (Exception ex) {
            throw new Exception(ex);
        }

    }
}
