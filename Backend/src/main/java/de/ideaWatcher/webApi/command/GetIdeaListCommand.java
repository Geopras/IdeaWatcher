package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.GetIdeaListWorkflow;

/**
 * Command zum Abrufen einer Ideenliste
 * */
public class GetIdeaListCommand implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit Ideen-Filter ausfuehren
     * @param data {JsonObject} Ideen-Filter
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        GetIdeaListWorkflow workflow = new GetIdeaListWorkflow();
        return workflow.getResponse(data);
    }
}
