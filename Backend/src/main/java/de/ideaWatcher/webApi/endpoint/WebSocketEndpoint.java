package main.java.de.ideaWatcher.webApi.endpoint;

import main.java.de.ideaWatcher.webApi.manager.InstanceManager;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.logging.Level;
import java.util.logging.Logger;

@ServerEndpoint("/wsEndpoint")
public class WebSocketEndpoint {

    private static final Logger log = Logger.getLogger( WebSocketEndpoint.class.getName() );

	// Request-String in Java-Objekt umwandeln und weitersenden
    @OnMessage
    public void handleRequest(Session session, String request) {

        try {
            if (session.isOpen()) {
                // Validierung des Tokens mit UserID
                // außer bei Login -> dort nur UserID und Token erzeugen
                String response = InstanceManager.getRequestManager().getResponse(request);
                session.getBasicRemote().sendText(response);
            }
        } catch (Exception ex) {
            try {
                log.log(Level.SEVERE, "Beim Behandeln des Requests ist ein " +
                        "Fehler aufgetreten! Die " +
                        "WebSocket-Verbindung wird geschlossen werden!\n" +
                        "Fehlermeldung: " + ex.getMessage());
                session.close();
            } catch (Exception e1) {
                log.log(Level.SEVERE, "Beim Schliessen der " +
                        "WebSocket-Verbindung ist ein Fehler aufgetreten!\n" +
                        "Fehlermeldung: " + ex.getMessage());
            }
        }
    }

    @OnOpen
    public void open(Session session) {
        log.log(Level.INFO, "Eine neue Session wurde gestartet.");
    }

    @OnClose
    public void close(Session session) {
        log.log(Level.INFO, "Die Session wurde beendet.");
    }

    @OnError
    public void onError(Throwable error) {
        log.log(Level.SEVERE, "Es trat ein Fehler auf in der Session.\n" +
                "Fehlermeldung: " + error.toString());
    }
}
