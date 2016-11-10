package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.workflow.SignupWorkflow;

/**
 * Created by geopras on 05.11.16.
 */
public class SignupCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        SignupWorkflow workflow = new SignupWorkflow();
        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher.webApi.core.IRequest) data);
    }
}
