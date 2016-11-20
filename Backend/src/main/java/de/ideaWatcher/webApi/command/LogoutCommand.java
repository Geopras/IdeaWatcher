package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.workflow.LogoutWorkflow;

/**
 * Command zum Ausfuehren des UserSession-Workflows
 * @param <IRequest> Request-Datentyp fuer Eingabeparameter
 * @param <IResponse> Response-Datentyp fuer Ausgabeparameter
 * */
public class LogoutCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * Command zum Logout ausfuehren
     * @param data {JsonObject} User-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {

        LogoutWorkflow workflow = new LogoutWorkflow();
        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher
                .webApi.core.IRequest) data);
    }
}
