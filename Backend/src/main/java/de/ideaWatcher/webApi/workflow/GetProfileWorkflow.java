package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Workflow zum Anzeigen des Benutzerprofils
 */
public class GetProfileWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( GetProfileWorkflow.class.getName() );
    private IUserController user;

    public GetProfileWorkflow() {

        this.user = InstanceManager.getDataManager().getUserController();
    }

    @Override
    public IResponse getResponse(IRequest request) {

        // die ID des Users, der die Anfrage gestellt hat
        String userId = request.getUserId();

        // die ID des Users, dessen Daten angefragt wurden
        String requestUserId;

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        try {
            JSONObject requestData = request.getData();
            requestUserId = requestData.getString("userId");
        } catch (Exception ex) {
            response.setErrorMessage("SProfile_getUserData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Auswerten der Parameter für die Abfrage des Userprofils " +
                    "ist ein Fehler aufgetreten!\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }

        //region Den zur Request-UserID zugehoerigen User in DB abfragen
        try {
            IUser foundUser = this.user.getUser(requestUserId);
            response.setResult("success");
            response.setData(JSONBuilder.getFullUserJSONObject(foundUser));
            return response;
        } catch (Exception ex) {
            response.setErrorMessage("SProfile_getUser_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Abfrage eines bestimmten User aus " +
                    "der Datenbank ist ein Fehler " +
                    "aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }
        //endregion
    }

}
