package main.java.de.ideaWatcher.webApi.workflow;


import main.java.de.ideaWatcher.webApi.core.IRequest;
import main.java.de.ideaWatcher.webApi.core.IResponse;
import main.java.de.ideaWatcher.webApi.core.JSONBuilder;
import main.java.de.ideaWatcher.webApi.core.Response;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Worflow zum Abrufen einer IdeenListe
 */
public class GetIdeaListWorkflow  implements IWorkflow {

    private static final Logger log = Logger.getLogger( GetIdeaListWorkflow.class.getName() );

    @Override
    public IResponse getResponse(IRequest request) {

        JSONObject data = request.getData();

        String listType;
        String category;
        int fromRank;
        int toRank;
        boolean isRenderNewIdeaList;
        boolean isReachedEnd = false;

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        // Prüfe, ob die im Data-Objekt uebergebenen Parameter OK sind
        try {
            listType = data.getString("listType");
            category = data.getString("category");
            fromRank = data.getInt("fromRank");
            toRank = data.getInt("toRank");
            isRenderNewIdeaList = data.getBoolean("isRenderNewIdeaList");

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

        List<IIdea> filteredIdeas = null;
        try {
            filteredIdeas = InstanceManager.getIdeaManager()
                    .filterIdeas(listType, category, fromRank, toRank);
        } catch (Exception e) {
            log.log(Level.SEVERE, "Ein Fehler ist bei der Filterung" +
                    " der Ideen.\nFehlermeldung: " + e.toString());
            response.setErrorMessage("SIdeaList_filterIdeas_error");
        }

//        try {
//            allIdeas = this.ideaController.getAllIdeas();
//        } catch (Exception e) {
//            log.log(Level.SEVERE, "Beim Abrufen der Ideen aus der Datenbank " +
//                    "ist ein Fehler aufgetreten.\nFehlermeldung: " + e.toString());
//            response.setErrorMessage("SIdeaList_getIdeasFromDb_error");
//            response.setResult("error");
//            return response;
//        }

        // Prüfe, ob der gewünschte Bereich möglich ist:
        int countIdeas = filteredIdeas.size();
        if (fromRank <= countIdeas && toRank > filteredIdeas.size()) {
            toRank = countIdeas;
            isReachedEnd = true;
        } else if (fromRank > countIdeas) {

            log.log(Level.SEVERE, "Die Angabe 'toRank = " + toRank + "' bei " +
                    "der Abfrage 'getIdeas' ist größer als die vorhandene " +
                    "Anzahl an Ideen (" + countIdeas + ").");
            response.setResult("error");
            response.setErrorMessage("SIdeaList_fromRankTooLarge_error");
        }

        //TODO: an dieser Stelle muessten jetzt fuer die Filter-Ergebnisse die vollen Daten aus der DB
        // nachgeladen werden

        response.setResult("success");
        JSONObject responseData = new JSONObject();
        responseData.put("listType", listType);
        responseData.put("category", category);
        responseData.put("ideas", this.ideaDataToJSONObject(filteredIdeas));
        responseData.put("isRenderNewIdeaList", isRenderNewIdeaList);
        responseData.put("isReachedEnd", isReachedEnd);
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
