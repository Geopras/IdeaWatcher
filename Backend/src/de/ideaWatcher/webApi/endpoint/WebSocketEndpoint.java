package de.ideaWatcher.webApi.endpoint;

import de.ideaWatcher.webApi.services.RequestService;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint("/wsEndpoint")
public class WebSocketEndpoint {

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
        } catch (IOException e) {
            try {
                session.close();
            } catch (IOException e1) {
                // Ignore
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
