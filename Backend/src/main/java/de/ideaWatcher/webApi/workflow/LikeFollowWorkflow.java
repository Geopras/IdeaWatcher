package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *     hier drin soll eine Idee gelikt, unliked, verfolgt, entfolgt werden können
 *     liken: NutzerID und IdeenID übergeben --> bekomme Info über Ergebnis des requests und Anzahl der Likes für diese Idee zurück
 */
public class LikeFollowWorkflow implements IWorkflow {

    private static final Logger log = Logger.getLogger( ProfileEditWorkflow.class.getName() );
    private IIdeaController ideaController;
    private IUserController userController;

    public LikeFollowWorkflow() {

        this.userController = InstanceManager.getDataManager().getUserController();
        this.ideaController = InstanceManager.getDataManager().getIdeaController();
    }

    public IResponse getResponse(IRequest request) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        String userId;
        String ideaId;
        String action;

        try {
            JSONObject likeFollowData = request.getData();
            userId = likeFollowData.getString("userId");
            ideaId = likeFollowData.getString("ideaId");
            action = likeFollowData.getString("action");
        } catch (Exception ex) {
            response.setErrorMessage("SIdeaDetails_likeFollowData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Beim Auswerten der uebergebenen Parameter ist ein Fehler aufgetreten!" +
                    "\nFehlermeldung: "
                    + ex.getMessage());
            return response;
        }

        return null;
    }


}
