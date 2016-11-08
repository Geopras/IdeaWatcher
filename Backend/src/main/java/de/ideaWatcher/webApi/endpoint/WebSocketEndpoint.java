package main.java.de.ideaWatcher.webApi.endpoint;

import main.java.de.ideaWatcher.webApi.services.RequestService;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@ServerEndpoint("/wsEndpoint")
public class WebSocketEndpoint {

    private static final Logger log = Logger.getLogger( WebSocketEndpoint.class.getName() );
    private RequestService requestService;

	// Request-String in Java-Objekt umwandeln und weitersenden
    @OnMessage
    public void handleRequest(Session session, String request) {

        try {
            if (session.isOpen()) {
                // Validierung des Tokens mit UserID
                // außer bei Login -> dort nur UserID und Token erzeugen
                String response = requestService.getResponse(request);
                session.getBasicRemote().sendText(response);
            }
        } catch (IOException ex) {
            try {
                log.log(Level.SEVERE, "Beim Behandeln des Requests ist ein " +
                        "Fehler aufgetreten! Die " +
                        "WebSocket-Verbindung wird geschlossen werden!\n" +
                        "Fehlermeldung: " + ex.getMessage());
                session.close();
            } catch (IOException e1) {
                log.log(Level.SEVERE, "Beim Schliessen der " +
                        "WebSocket-Verbindung ist ein Fehler aufgetreten!\n" +
                        "Fehlermeldung: " + ex.getMessage());
            }
        }
    }

    @OnOpen
    public void open(Session session) {
        System.out.println("Session open");
        requestService = new RequestService();
        requestService.initialize();
    }

    @OnClose
    public void close(Session session) {
    }

    @OnError
    public void onError(Throwable error) {
    }
}
