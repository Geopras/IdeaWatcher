package de.ideaWatcher.webApi.commands;

import de.ideaWatcher.common.ICommand;
import de.ideaWatcher.webApi.workflows.SignupWorkflow;

/**
 * Created by geopras on 05.11.16.
 */
public class SignupCommand<Request, Response> implements ICommand<Request,
        Response> {

    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public Response apply(Request data) {
        SignupWorkflow workflow = new SignupWorkflow();
        return (Response) workflow.getResponse((de.ideaWatcher.webApi.core.Request) data);
    }
}
