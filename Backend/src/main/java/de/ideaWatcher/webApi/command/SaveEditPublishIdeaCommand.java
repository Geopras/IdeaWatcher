package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.SaveEditPublishIdeaWorkflow;

/**
 * Command zum Anlegen, Veröffentlichen und Bearbeiten einer Idee
 * */
public class SaveEditPublishIdeaCommand implements ICommand<IRequest,
        IResponse> {

    /**
     * @param data {IRequest} sollte die ideaId enthalten
     * @return {IResponse} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        SaveEditPublishIdeaWorkflow workflow = new SaveEditPublishIdeaWorkflow();
        return workflow.getResponse(data);
    }
}