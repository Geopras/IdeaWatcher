package de.ideaWatcher.webApi.core;

import javax.json.JsonObject;

/**
 * Interface zur Erstellung einer neuen Workflow-Klasse
 */
public interface IWorkflow {

    JsonObject getResponse(JsonObject data);
}
