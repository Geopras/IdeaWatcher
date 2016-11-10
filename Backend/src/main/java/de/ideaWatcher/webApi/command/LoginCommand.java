package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.workflow.LoginWorkflow;
/**
 * Command zum Ausfuehren des Login-Workflows
 * @param <IRequest> Request-Datentyp fuer Eingabeparameter
 * @param <IResponse> Response-Datentyp fuer Ausgabeparameter
 * */
public class LoginCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        LoginWorkflow workflow = new LoginWorkflow();
        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher
                .webApi.core.IRequest) data);
    }
}
