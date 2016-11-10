package main.java.de.ideaWatcher.webApi.manager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Klasse zur Verwaltung von Tokens
 */
public class TokenManager {

    private List<Long> tokens;

    public TokenManager() {

        this.tokens = new ArrayList<>();
    }

    public Long generateToken() {

        //region Wenn noch kein Token vorhanden, dann bei 1 beginnen
        if (this.tokens.size() == 0) {
            // mit 1 beginnen:
            return new Long(1);
        }
        //endregion

        //region Wenn Tokens vorhanden, dann Maximalwert + 1 nehmen
        Comparator<Long> cmp = (o1, o2) -> Long.valueOf(o1).compareTo(Long
                .valueOf(o2));
        return new Long(Collections.max(this.tokens, cmp).toString() + 1);
        //endregion
    }

    public boolean existsToken(Long token) {

        // User-Authentifizierung (Token-Prüfung)
        if (this.tokens.contains(token)) {
            return true;
        } else {
            return false;
        }
    }

}
