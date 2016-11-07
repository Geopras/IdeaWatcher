package main.java.de.ideaWatcher.webApi.workflows;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;

/**
 * Interface zur Erstellung einer neuen Workflow-Klasse
 */
public interface IWorkflow {

    IResponse getResponse(IRequest data);
}
