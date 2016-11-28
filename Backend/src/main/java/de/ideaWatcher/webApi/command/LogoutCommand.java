package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.LogoutWorkflow;

/**
 * Command zum Ausfuehren des UserSession-Workflows
 * */
public class LogoutCommand implements ICommand<IRequest,
        IResponse> {

    /**
     * Command zum Logout ausfuehren
     * @param data {JsonObject} User-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {

        LogoutWorkflow workflow = new LogoutWorkflow();
        return workflow.getResponse(data);
    }
}
