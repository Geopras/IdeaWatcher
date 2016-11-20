package main.java.de.ideaWatcher.webApi.workflow;


import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.core.*;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Worflow zum Abrufen einer IdeenListe
 */
public class GetIdeaListWorkflow  implements IWorkflow {

    private static final Logger log = Logger.getLogger( GetIdeaListWorkflow.class.getName() );
    private IIdeaController ideaController;

    public GetIdeaListWorkflow() {

        this.ideaController = InstanceManager.getDataManager().getIdeaController();
    }

    @Override
    public IResponse getResponse(IRequest request) {

        JSONObject data = request.getData();

        String listType;
        String category;
        int fromRank;
        int toRank;
        String destinationUrl;
        String isRenderNewIdeaList;

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        // Prüfe, ob die im Data-Objekt uebergebenen Parameter OK sind
        try {
            listType = data.getString("listType");
            category = data.getString("category");
            fromRank = data.getInt("fromRank");
            toRank = data.getInt("toRank");
            destinationUrl = data.getString("destinationUrl");
            isRenderNewIdeaList = data.getString("isRenderNewIdeaList");

        } catch (Exception ex) {
            response.setErrorMessage("SIdeaList_getIdeasRequestData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Auswertung der Request-Paramter für die Abfrage " +
                    "einer IdeenListe ist ein Fehler aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        if (fromRank > toRank){
            response.setErrorMessage("SIdeaList_getIdeasBounds_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Die übergebenen fromRank und toRank passen logisch nicht zueinander." +
            "fromRank: " + fromRank + ", toRank:" + toRank);
            return response;
        }

        // Suche die Ideen im vorgehaltenen Snapshot
        List<IIdea> filteredIdeas = InstanceManager.getIdeaManager()
                .filterIdeas(listType, category, fromRank, toRank);

        //TODO: an dieser Stelle muessten jetzt fuer die Filter-Ergebnisse die vollen Daten aus der DB
        // nachgeladen werden

        response.setResult("success");
        JSONObject responseData = new JSONObject();
        responseData.put("listType", listType);
        responseData.put("category", category);
        responseData.put("ideas", this.ideaDataToJSONObject(filteredIdeas));
        responseData.put("destinationUrl", destinationUrl);
        responseData.put("isRenderNewIdeaList", isRenderNewIdeaList);
        response.setData(responseData);
        return response;
    }

    private JSONArray ideaDataToJSONObject(List<IIdea> ideas) {

        JSONArray ideasArray = new JSONArray();

        for (IIdea idea : ideas){
            //ideasArray.put(idea.toJSONObject()) ;
        }

        return ideasArray;
    }

}
