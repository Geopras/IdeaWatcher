package main.java.de.ideaWatcher.webApi.manager;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Klasse zur Verwaltung von Tokens
 */
public class TokenManager {

    private Map<String, String> tokenMap;

    public TokenManager() {

        this.tokenMap = new HashMap<>();
    }

    public String generateToken(String userId) throws Exception {

        String newToken = UUID.randomUUID().toString();
        this.tokenMap.put(userId, newToken);
        return newToken;
    }

    public boolean validateToken(String userId, String token) throws Exception {

        // User-Authentifizierung (Token-UserId-Prüfung)
        try {
            if (this.tokenMap.get(userId) == null) {
                return false;
            }
            if (this.tokenMap.get(userId).equals(token)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

}
