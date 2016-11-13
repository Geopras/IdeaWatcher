package main.java.de.ideaWatcher.webApi.manager;

import java.util.*;

/**
 * Klasse zur Verwaltung von Tokens
 */
public class TokenManager {

    private Map<String, String> tokens;

    public String getTokenValue(String token) throws Exception {

        if (this.existsToken(token)) {
            return this.tokens.get(token);
        } else {
            throw new Exception("token_not_exists");
        }
    }

    public TokenManager() {

        this.tokens = new HashMap<>();
    }

    public String generateToken(String userName) {

        String newToken = UUID.randomUUID().toString();
        this.tokens.put(newToken, userName);
        return newToken;
    }

    public boolean existsToken(String token) {

        // User-Authentifizierung (Token-Prüfung)
        if (this.tokens.containsKey(token)) {
            return true;
        } else {
            return false;
        }
    }

}
