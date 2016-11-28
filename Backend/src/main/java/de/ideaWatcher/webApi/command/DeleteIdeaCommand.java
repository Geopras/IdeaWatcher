package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.workflow.DeleteIdeaWorkflow;

/**
 * Command zum Löschen einer Idee
 */
public class DeleteIdeaCommand implements ICommand<IRequest, IResponse> {

    @Override
    public IResponse apply(IRequest data) {
        DeleteIdeaWorkflow workflow = new DeleteIdeaWorkflow();
        return workflow.getResponse(data);
    }

}
