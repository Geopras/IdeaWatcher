package main.java.de.ideaWatcher.webApi.workflow;


import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.core.*;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;
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

        // Die UserID der Anfrage zur Abfrage der Datenbank:
        String userId = request.getUserId();
        JSONObject data = request.getData();

        String listType;
        String category;
        int fromRank;
        int toRank;

        List<Idea> allIdeas;
        List<Idea> filteredIdeas = new ArrayList<Idea>();

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        // Prüfe, ob die im Data-Objekt uebergebenen Parameter OK sind
        try {
            listType = data.getString("listType");
            category = data.getString("category");
            fromRank = data.getInt("fromRank");
            toRank = data.getInt("toRank");

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

        // hole alle Ideen ...
        allIdeas = getTestIdeas();
        // ... und bewerte diese
        // TODO: Bewertung muss später an anderer Stelle erfolgen
        calculateIdeaRankings(allIdeas);

        if (listType.equals("HOT") || listType.equals("CATEGORY")){
            allIdeas.sort(new IdeaHotRankComparator(true));
        }
        if (listType.equals("TRENDING")){
            allIdeas.sort(new IdeaTrendingRankComparator(true));
        } else if (listType.equals("FRESH")){
            allIdeas.sort(new IdeaAgeComparator(true));
        }

        long allIdeasCount = allIdeas.size();

        // Hole die Ideen aus der sortieren Liste entsprechend der gewünschten Bounds
        for (int i = fromRank - 1; i < toRank; i++){

            if (i < allIdeasCount){
                filteredIdeas.add(allIdeas.get(i));
            }
        }

        response.setResult("success");
        response.setData(this.ideaDataToJSONObject(filteredIdeas));
        return response;
    }

    private JSONObject ideaDataToJSONObject(List<Idea> ideas) {

        // TODO: klaeren, wie mehrere JSON-Objekte übergeben werden
        for (Idea idea:ideas){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("name", idea.getName());
            jsonObject.put("description", idea.getDescription());
            jsonObject.put("category", idea.getCategory());
            jsonObject.put("creator", idea.getCreator());
            jsonObject.put("publishDate", idea.getPublishDate());
            jsonObject.put("language", idea.getLanguage());
            jsonObject.put("hotRank", idea.getHotRank());
            jsonObject.put("trendingRank", idea.getTrendingRank());
            // jsonObject.put("likeUsers", idea.getLikeUsers());
            jsonObject.put("numberLikes", idea.getNumberLikes());
            // jsonObject.put("followers", idea.getFollowerUsers());
            jsonObject.put("numberFollowers", idea.getNumberFollowers());
            // jsonObject.put("comments", idea.getComments());
            jsonObject.put("numberComments", idea.getNumberComments());
            return jsonObject;
        }

        return null;
    }

    /**
     * Erzeugt eine Liste mit Test-Ideen.
     * @return
     */
    public List<Idea> getTestIdeas(){
        ArrayList<Idea> ideas = new ArrayList<Idea>();
        Random r = new Random();
        Calendar calendar;

        // erzeuge 100 Testideen
        for (int i = 0; i < 100; i++){

            Idea newIdea = new Idea();
            calendar =  new GregorianCalendar();

            // Zeitraum letzte 5 Jahre
            calendar.add(Calendar.DAY_OF_MONTH, (-1 * r.nextInt(365 * 5)));

            newIdea.setPublishDate(calendar.getTime());
            newIdea.setNumberLikes((long) r.nextInt(1000));
            newIdea.setNumberFollowers((long) r.nextInt(100));
            newIdea.setName("Idee Nummer " + i);
            newIdea.setDescription("Eine ganz tolle Idee");

            ideas.add(newIdea);
        }

        return ideas;
    }

    /**
     * Bewertet die übergebene IdeenListe und setzt die hotRankings und trendingRankings
     */
    public void calculateIdeaRankings(List<Idea> ideas){

        double hotRatingLikes = 0.5;
        double hotRatingFollows = 0.3;
        double hotRatingAge = 0.2;
        double trendingRatingLikes = 0.3;
        double trendingRatingFollows = 0.1;
        double trendingRatingAge = 0.6;

        long maxLikes = Collections.max(ideas, new IdeaLikesComparator()).getNumberLikes();
        long maxFollowers = Collections.max(ideas, new IdeaFollowersComparator()).getNumberFollowers();

        Date oldestPublishDate = Collections.min(ideas, new IdeaAgeComparator()).getPublishDate();
        // alter der ältesten Idee in Sekunden
        long maxAge = (new Date().getTime() - oldestPublishDate.getTime()) / 1000;

        for (Idea idea:ideas){

            double likeRatio = ((double) idea.getNumberLikes()) / maxLikes;
            double followRatio = ((double) idea.getNumberFollowers()) / maxFollowers;
            double ageRatio = ((double)(maxAge -
                    ((new Date().getTime() - idea.getPublishDate().getTime()) / 1000)))
                    / maxAge;

            idea.setHotRank(likeRatio * hotRatingLikes +
                    followRatio * hotRatingFollows +
                    ageRatio * hotRatingAge);

            idea.setTrendingRank(likeRatio * trendingRatingLikes +
                    followRatio * trendingRatingFollows +
                    ageRatio * trendingRatingAge);
        }
    }

}
