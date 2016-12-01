package main.java.de.ideaWatcher.webApi.workflow;


import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.manager.IdeaManager;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Worflow zum Abrufen einer IdeenListe
 */
public class GetIdeaListWorkflow  implements IWorkflow {

    private static final Logger log = Logger.getLogger( GetIdeaListWorkflow.class.getName() );
    private IdeaManager ideaManager;

    public GetIdeaListWorkflow() {
        this.ideaManager = InstanceManager.getIdeaManager();
    }

    @Override
    public IResponse getResponse(IRequest request) {

        JSONObject data = request.getData();

        String listType;
        String category;
        String searchText = "";
        int fromRank;
        int toRank;
        String userId = "";
        boolean isMyIdeas = false;
        boolean isMyFollowedIdeas = false;
        boolean isMySearch = false;


        boolean isRenderNewIdeaList;

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        // Prüfe, ob die im Data-Objekt uebergebenen Parameter OK sind
        try {
            listType = data.getString("listType");
            if (listType.equals("MYIDEAS")) {
                isMyIdeas = true;
            }
            if (listType.equals("MYFOLLOWEDIDEAS")) {
                isMyFollowedIdeas = true;
            }
            if (listType.equals("MYSEARCH")) {
                isMySearch = true;
            }
            category = data.getString("category");
            fromRank = data.getInt("fromRank");
            toRank = data.getInt("toRank");
            isRenderNewIdeaList = data.getBoolean("isRenderNewIdeaList");
            if (isMyIdeas || isMyFollowedIdeas) {
                userId = data.getString("userId");
            }
            if (isMySearch) {
                searchText = data.getString("searchText");
            }
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

        // Hole die zu filternde Ideenliste aus der Datenbank
        List<IIdea> ideasToFilter;

        try {
            if (isMyIdeas) {
                ideasToFilter = this.ideaManager.getMyIdeas(userId);
            }
            else if (isMyFollowedIdeas) {
                ideasToFilter = this.ideaManager.getMyFollowedIdeas(userId);
            }
            else if (isMySearch) {
                ideasToFilter = this.ideaManager.getMySearchedIdeas(searchText);
            }
            else {
                ideasToFilter = this.ideaManager.getCategorizedIdeas(category);
            }
        } catch (Exception e) {
            log.log(Level.SEVERE, "Ein Fehler ist bei der Abfrage der zu " +
                    "filternden Ideen aufgetreten.\nFehlermeldung: " + e.toString());
            response.setErrorMessage("SIdeaList_getIdeasFromDb_error");
            response.setResult("error");
            return response;
        }

        if (ideasToFilter.isEmpty()) {
            log.log(Level.WARNING, "Die zu filternde Ideenliste ist leer.");
            JSONObject responseData = new JSONObject();
            responseData.put("listType", listType);
            responseData.put("category", category);
            responseData.put("isRenderNewIdeaList", isRenderNewIdeaList);
            responseData.put("ideas", this.ideaDataToJSONObject(new ArrayList<>()));
            response.setData(responseData);
            response.setResult("success");
            return response;
        }

        // Sortiere die Ideen nach gewünschtem Comparator:
        ideasToFilter = this.ideaManager.sortIdeas(ideasToFilter, listType);

        // Filtere die Ideen entsprechend des Ranking-Bereichs:
        List<IIdea> filteredIdeas = this.ideaManager
                .filterIdeas(ideasToFilter, fromRank, toRank);

        response.setResult("success");
        JSONObject responseData = new JSONObject();
        responseData.put("listType", listType);
        responseData.put("category", category);
        responseData.put("ideas", this.ideaDataToJSONObject(filteredIdeas));
        responseData.put("isRenderNewIdeaList", isRenderNewIdeaList);
        response.setData(responseData);
        return response;
    }

    private JSONArray ideaDataToJSONObject(List<IIdea> ideas) {

        JSONArray ideasArray = new JSONArray();

        for (IIdea idea : ideas){
            ideasArray.put(JSONBuilder.getIdeaListJSONObject(idea)) ;
        }

        return ideasArray;
    }

}
