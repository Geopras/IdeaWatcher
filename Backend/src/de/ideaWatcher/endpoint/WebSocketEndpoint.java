package de.ideaWatcher.endpoint;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint("/wsEndpoint")
public class WebSocketEndpoint {

	// implementation of Task #10 - WebSocketConnection goes here
    @OnMessage
    public void getMessage(Session session, String msg) {
        try {
            if (session.isOpen()) {
                session.getBasicRemote().sendText(msg);
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
    }

    @OnClose
    public void close(Session session) {
    }

    @OnError
    public void onError(Throwable error) {
    }
}
