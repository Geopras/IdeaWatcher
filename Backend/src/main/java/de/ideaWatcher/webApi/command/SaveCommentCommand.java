package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.workflow.LikeFollowWorkflow;
import main.java.de.ideaWatcher.webApi.workflow.ProfileEditWorkflow;
import main.java.de.ideaWatcher.webApi.workflow.SaveCommentWorkflow;

/**
 * Created by Stefan on 21.11.2016.
 */
public class SaveCommentCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit UserSession-Daten ausfuehren
     * @param data {JsonObject} UserSession-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        SaveCommentWorkflow workflow = new SaveCommentWorkflow();
        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher
                .webApi.core.IRequest) data);
    }
}