package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.GetIdeaDetailsWorkflow;

/**
 * Command zum Abrufen der Details einer Idee
 * */
public class GetIdeaDetailsCommand implements ICommand<IRequest,
        IResponse> {

    /**
     * @param data {IRequest} sollte die ideaId enthalten
     * @return {IResponse} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        GetIdeaDetailsWorkflow workflow = new GetIdeaDetailsWorkflow();
        return workflow.getResponse(data);
    }
}
