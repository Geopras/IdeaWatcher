package de.ideaWatcher.webApi.core;

/**
 * Interface zur Erstellung einer neuen Workflow-Klasse
 */
public interface IWorkflow {

    Response getResponse(Request data);
}
