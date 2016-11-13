package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;

public class ProfileEditWorkflow implements IWorkflow {


    public IResponse getResponse(IRequest data) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        response.setResult("test123");

        return response;
    }
}
