package main.java.de.ideaWatcher.webApi.command;

import main.java.de.ideaWatcher.common.ICommand;

/**
 * Command zum Anlegen einer neuen Idee
 * @param <IRequest> Request-Datentyp fuer Eingabeparameter
 * @param <IResponse> Response-Datentyp fuer Ausgabeparameter
 * */
public class AddIdeaCommand<IRequest, IResponse> implements ICommand<IRequest,
        IResponse> {

    /**
     * @param data {IRequest} sollte die ideaId enthalten
     * @return {IResponse} Ergebnis des Workflow als Antwort
     */
    @Override
    public IResponse apply(IRequest data) {
//        GetIdeaDetailsWorkflow workflow = new GetIdeaDetailsWorkflow();
//        return (IResponse) workflow.getResponse((main.java.de.ideaWatcher
//                .webApi.core.IRequest) data);
    	return null;
    }
}