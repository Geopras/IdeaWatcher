package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.SaveIdeaWorkflow;

/**
 * Command zum Anlegen einer neuen Idee
 * */
public class AddIdeaCommand implements ICommand<IRequest,
        IResponse> {

    /**
     * @param data {IRequest} sollte die ideaId enthalten
     * @return {IResponse} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        SaveIdeaWorkflow workflow = new SaveIdeaWorkflow();
        return workflow.getResponse(data);
    }
}