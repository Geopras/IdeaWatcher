package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import main.java.de.ideaWatcher.webApi.manager.TokenManager;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Workflow zum Ausführen des User Logouts
 */
public class LogoutWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( LogoutWorkflow.class
            .getName() );
    private TokenManager tokenManager;

    public LogoutWorkflow() {

        this.tokenManager = InstanceManager.getTokenManager();
    }
    @Override
    public IResponse getResponse(IRequest data) {

        String userId = data.getUserId();

        IResponse response = new Response();

        //region Lösche User aus Tokenliste
        try {
            this.tokenManager.deleteToken(userId);
        } catch (Exception ex) {
            response.setResult("error");
            response.setErrorMessage("SLogin_deleteToken_error");
            log.log(Level.SEVERE, "Beim Löschen des Users aus der Tokenliste " +
                    "ist etwas schief gegangen.\nFehlermeldung: " + ex
                    .toString());
            return response;
        }
        //endregion

        // Bei erfolgreichem Abmelden
        response.setResult("success");

        return response;
    }
}
