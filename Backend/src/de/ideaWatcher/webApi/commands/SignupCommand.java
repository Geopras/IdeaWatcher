package de.ideaWatcher.webApi.commands;

import de.ideaWatcher.common.ICommand;
import de.ideaWatcher.webApi.workflows.SignupWorkflow;

import javax.json.JsonObject;

/**
 * Created by geopras on 05.11.16.
 */
public class SignupCommand implements ICommand<JsonObject> {
    /**
     * Command mit Login-Daten ausfuehren
     * @param data {JsonObject} Login-Daten
     * @return {JsonObject} Ergebnis des Workflow als Antwort
     */
    @Override
    public JsonObject apply(JsonObject data) {
        SignupWorkflow workflow = new SignupWorkflow();
        return (JsonObject) workflow.getResponse((javax.json.JsonObject) data);
    }
}
