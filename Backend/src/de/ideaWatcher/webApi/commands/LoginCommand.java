package de.ideaWatcher.webApi.commands;

import de.ideaWatcher.common.ICommand;
import main.java.ideaWatcher.webApi.workflows.LoginWorkflow;
/**
 * Command zum Ausfuehren des Login-Workflows
 * @param <Request> Request-Datentyp fuer Eingabeparameter
 * @param <Response> Response-Datentyp fuer Ausgabeparameter
 * */
public class LoginCommand<Request, Response> implements ICommand<Request,
        Response> {

    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public Response apply(Request data) {
        LoginWorkflow workflow = new LoginWorkflow();
        return (Response) workflow.getResponse((de.ideaWatcher.webApi.core.Request) data);
    }
}
