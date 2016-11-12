package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.workflow.ProfileEditWorkflow;

public class ProfileEditCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        ProfileEditWorkflow workflow = new ProfileEditWorkflow();
        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher
                .webApi.core.IRequest) data);
    }
}
