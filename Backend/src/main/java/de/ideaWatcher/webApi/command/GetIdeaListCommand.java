package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;
import main.java.de.ideaWatcher.webApi.workflow.GetIdeaListWorkflow;
import main.java.de.ideaWatcher.webApi.workflow.GetProfileWorkflow;

/**
 * Command zum Abrufen einer Ideenliste
 * @param <IRequest> Request-Datentyp fuer Eingabeparameter
 * @param <IResponse> Response-Datentyp fuer Ausgabeparameter
 * */
public class GetIdeaListCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * Command mit Ideen-Filter ausfuehren
     * @param data {JsonObject} Ideen-Filter
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
        GetIdeaListWorkflow workflow = new GetIdeaListWorkflow();
        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher
                .webApi.core.IRequest) data);
    }
}
