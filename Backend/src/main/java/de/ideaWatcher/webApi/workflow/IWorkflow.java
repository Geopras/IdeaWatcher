package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;

/**
 * Interface zur Erstellung einer neuen Workflow-Klasse
 */
public interface IWorkflow {

    IResponse getResponse(IRequest data);
}
