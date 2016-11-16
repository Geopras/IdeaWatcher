package main.java.de.ideaWatcher.webApi.workflow;


import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.core.*;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
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
        long fromRank;
        long toRank;

        List<Idea> allIdeas;
        List<Idea> filteredIdeas;

        // Workflow-Antwort instanziieren
        IResponse response = new Response();

        // Prüfe, ob die im Data-Objekt uebergebenen Parameter OK sind
        try {
            listType = data.getString("listType");
            category = data.getString("category");
            fromRank = data.getLong("fromRank");
            toRank = data.getLong("toRank");

        } catch (Exception ex) {
            response.setErrorMessage("SIdeaList_getIdeasRequestData_error");
            response.setResult("error");
            log.log(Level.SEVERE, "Bei der Auswertung der Request-Paramter für die Abfrage " +
                    "einer IdeenListe ist ein Fehler aufgetreten!\nFehlermeldung: " + ex.getMessage());
            return response;
        }

        // hole alle Ideen
        allIdeas = calculateIdeaRankings();

        if (listType.equals("HOT") || listType.equals("CATEGORY")){
            //allIdeas.sort(new IdeaHotRankComparator());
        }
        if (listType.equals("TRENDING")){
            //allIdeas.sort(new IdeaTrendingRankComparator());
        } else if (listType.equals("FRESH")){
            //allIdeas.sort(new IdeaAgeComparator());
        }


        //region Den zur Request-UserID zugehoerigen User in DB abfragen
        try {
//            foundUser = this.user.getUser(userId);
            response.setResult("success");
//            response.setData(this.userDataToJSONObject(foundUser));
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

    /**
     * Erzeugt erst einmal eine Liste mit Testdaten und wendet auf diese den
     * Ranking-Algorithmus an.
     * @return
     */
    public List<Idea> calculateIdeaRankings(){

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

            ideas.add(newIdea);
        }


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

        return ideas;
    }

}
