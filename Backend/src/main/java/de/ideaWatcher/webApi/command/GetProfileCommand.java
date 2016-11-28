package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.GetProfileWorkflow;

/**
 * Command zum Abrufen der Profildaten
 * */
public class GetProfileCommand implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit UserSession-Daten ausfuehren
     * @param data {JsonObject} UserSession-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        GetProfileWorkflow workflow = new GetProfileWorkflow();
        return workflow.getResponse(data);
    }
}
