package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Workflow zur Registrierung eines Nutzers
 */
public class SignupWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( SignupWorkflow.class.getName() );
    private IUserController user;

    public SignupWorkflow() {

        this.user = InstanceManager.getDataManager().getUserController();
    }

    /**
     * Fuehre den Workflow aus und gib das Ergebnis als Response-Objekt zurueck.
     * 
     * @return {JsonObject} JSON-String als Ergebnis des Workflow
     */
    public IResponse getResponse(IRequest request) {

        JSONObject signupData = request.getData();
        String userName = signupData.getString("userName");
        String email = signupData.getString("email");
        String password = signupData.getString("password");

        // Response-Objekt erstellen
        IResponse response = new Response();

        // region wenn User nicht existiert, muss er angelegt werden
        boolean existsUser = false;
        try {
            // Username kann entweder der Name oder die Email des Users sein:
            boolean existsUserName = this.user.existsUserName(userName);
            if (existsUserName) {
                existsUser = true;
            } else {
                boolean existsEmail = this.user.existsEmail(email);
                if (existsEmail) {
                    existsUser = true;
                }
            }
        } catch (Exception ex) {
            response.setErrorMessage("SSignup_existsUser_error");
            response.setResult("notok");
            log.log(Level.SEVERE, "Beim Prüfen, ob ein User existiert ist ein" +
                    " Fehler aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        if (!existsUser) {
            // user muss angelegt werden
            IUser user = new User();
            user.setUserName(userName);
            user.setEmail(email);
            user.setPassword(password);
            try {
                this.user.addUser(user);
                response.setResult("ok");
                return response;
            } catch (Exception ex) {
                // wenn Fehler auftreten, dann wird ein zugehoeriger
                // Nachrichten-Key in errorMessage gespeichert
                response.setErrorMessage("SSignup_addUser_error");
                response.setResult("notok");
                log.log(Level.SEVERE, "Beim Hinzufügen eines neuen User in " +
                        "die Datenbank ist ein Fehler aufgetreten!\n" +
                        "Fehlermeldung" + ex.getMessage());
                return response;
            }
        } else {
            // Wenn User bereits existiert, dann über Nachrichten-Key Fehler
            // zurueckgeben
            response.setErrorMessage("SSignup_username_already_exists");
            response.setResult("notok");
            return response;
        }
        // end region
    }
}
