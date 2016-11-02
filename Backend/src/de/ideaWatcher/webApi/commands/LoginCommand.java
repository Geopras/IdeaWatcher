package de.ideaWatcher.webApi.commands;

import de.ideaWatcher.common.ICommand;
import de.ideaWatcher.webApi.workflows.LoginWorkflow;
/**
 * Command zum Ausfuehren des Login-Workflows
 * @param <JsonObject> Datentyp fuer Ein- und Ausgabeparameter
 */
public class LoginCommand<JsonObject> implements ICommand<JsonObject> {

    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public JsonObject apply(JsonObject data) {
        LoginWorkflow workflow = new LoginWorkflow();
        return (JsonObject) workflow.getResponse((javax.json.JsonObject) data);
    }
}
