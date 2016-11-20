package main.java.de.ideaWatcher.webApi.workflow;

import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Workflow zum Anzeigen der Ideendetails
 */
public class GetIdeaDetailsWorkflow  implements IWorkflow {

    private static final Logger log = Logger.getLogger( GetIdeaDetailsWorkflow.class.getName() );
    private IIdeaController ideaController;

    public GetIdeaDetailsWorkflow() {

        this.ideaController = InstanceManager.getDataManager().getIdeaController();
    }

    @Override
    public IResponse getResponse(IRequest request) {

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        JSONObject data = request.getData();

        String ideaID;

        // Prüfe, ob die im Data-Objekt uebergebenen Parameter OK sind
        try {
            ideaID = data.getString("ideaID");

        } catch (Exception ex) {
            response.setErrorMessage("SIdea_getIdeaDetailsRequestData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Auswertung der Request-Paramter für die Abfrage " +
                    "der Ideendetails ist ein Fehler aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        //region Den zur Request-UserID zugehoerigen User in DB abfragen
        IIdea foundIdea;
        try {
            //foundIdea = this.ideaController.getIdea(ideaID);

            //Testweise eine Beispiel-Idee erzeugen
            foundIdea = new Idea();
            IUser bspCreator = new User();
            bspCreator.setUserName("HansWurst");
            bspCreator.setUserId("12345");
            bspCreator.setEmail("hans@wurst.de");
            bspCreator.setIsMailPublic(true);

            foundIdea.setCreator(bspCreator);
            foundIdea.setName("Name einer Testidee");
            foundIdea.setCategory("gadget");
            foundIdea.setNumberLikes((long) 1337);
            foundIdea.setNumberFollowers((long) 42);
            foundIdea.setNumberComments((long) 2);
            foundIdea.setDescription("Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung " +
                    "Eine wunderschöne Beschreibung Eine wunderschöne Beschreibung");

            List<IComment> testComments = new ArrayList<IComment>();
            IComment testComment1 = new Comment();
            testComment1.setCreator(bspCreator);
            testComment1.setPublishDate(new Date());
            testComment1.setText("Jo, das ist eine ganz feine Idee.");
            testComments.add(testComment1);

            foundIdea.setComments(testComments);

            response.setResult("success");
            response.setData(JSONBuilder.getIdeaDetailsJSONObject(foundIdea));
            return response;
        } catch (Exception ex) {
            response.setErrorMessage("SIdea_getIdeaDetails_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Abfrage der IdeenDetails einer Idee aus " +
                    "der Datenbank ist ein Fehler " +
                    "aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }
        //endregion
    }


}