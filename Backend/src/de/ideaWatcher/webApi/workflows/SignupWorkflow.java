package de.ideaWatcher.webApi.workflows;

import de.ideaWatcher.dataManager.DataManager;
import de.ideaWatcher.webApi.core.IRequest;
import de.ideaWatcher.webApi.core.IResponse;
import de.ideaWatcher.webApi.core.Response;
import de.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;

import javax.json.Json;
import javax.json.JsonObject;

/**
 * Workflow zur Registrierung eines Nutzers
 */
public class SignupWorkflow implements IWorkflow {

    private IUserController user;

    public SignupWorkflow() {

        this.user = (new DataManager()).getInstanceUser();
    }

    /**
     * Fuehre den Workflow aus und gib das Ergebnis als Response-Objekt zurueck.
     * 
     * @return {JsonObject} JSON-String als Ergebnis des Workflow
     */
    public IResponse getResponse(IRequest request) {

        JsonObject signupData = request.getData();
        String userName = signupData.getString("username");
        String email = signupData.getString("email");
        String password = signupData.getString("password");

        // Response-Objekt erstellen
        IResponse response = new Response();

        // region wenn User nicht existiert, muss er angelegt werden
        boolean existsUser;
        try {
            existsUser = this.user.existsUser(userName);
        } catch (Exception ex) {
            response.setErrorMessage(ex.getMessage());
            response.setResult("notok");
            return response;
        }

        if (!existsUser) {
            // user muss angelegt werden
            try {
                Long userId = this.user.addUser(userName, email, password);
                JsonObject data = Json.createObjectBuilder()
                        .add("userId", userId).build();
                response.setData(data);
                response.setResult("ok");
                return response;

            } catch (Exception e) {
                // wenn Fehler auftreten, dann wird ein zugehoeriger
                // Nachrichten-Key in errorMessage gespeichert
                response.setErrorMessage(String.format
                        ("SSignup/user_signup_failed"));
                response.setResult("notok");
                return response;
            }
        } else {
            // Wenn User bereits existiert, dann über Nachrichten-Key Fehler
            // zurueckgeben
            response.setErrorMessage("SSignup/username_already_exists");
            response.setResult("notok");
            return response;
        }
        // end region
    }
}
