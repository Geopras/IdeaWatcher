package de.ideaWatcher.webApi.workflows;

import de.ideaWatcher.webApi.core.IRequest;
import de.ideaWatcher.webApi.core.IResponse;

/**
 * Interface zur Erstellung einer neuen Workflow-Klasse
 */
public interface IWorkflow {

    IResponse getResponse(IRequest data);
}
