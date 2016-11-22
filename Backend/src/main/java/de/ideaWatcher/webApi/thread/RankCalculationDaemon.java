package main.java.de.ideaWatcher.webApi.thread;


import main.java.de.ideaWatcher.webApi.core.IdeaAgeComparator;
import main.java.de.ideaWatcher.webApi.core.IdeaFollowersComparator;
import main.java.de.ideaWatcher.webApi.core.IdeaLikesComparator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.manager.IdeaManager;
import main.java.de.ideaWatcher.webApi.manager.InstanceManager;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Daemon-Thread für die Ausführung des Algorithmus zur Berechnung der Hot- und
 * Trending-Ranks.
 * Als Daemon wird der Thread automatisch mit beendet, wenn der Main-Thread
 * beendet wird.
 */
public class RankCalculationDaemon extends Thread {

    private static final Logger log = Logger.getLogger( RankCalculationDaemon.class.getName() );

    public RankCalculationDaemon()
    {
        setDaemon( true );
    }

    @Override public void run() {

        double hotRatingLikes = 0.5;
        double hotRatingFollows = 0.3;
        double hotRatingAge = 0.2;
        double trendingRatingLikes = 0.3;
        double trendingRatingFollows = 0.1;
        double trendingRatingAge = 0.6;
        long comparableStartTime = new Date().getTime();

        IdeaManager ideaManager = InstanceManager.getIdeaManager();
        IIdeaController ideaController = InstanceManager.getDataManager().getIdeaController();

        // TODO: die Ideen müssen aus dem DataManager geholt werden
        // Hole die Ideen aus der Datenbank
        // hier wird erstmal nur mit Testideen gearbeitet
        List<IIdea> ideas;
        try {
             //ideas = ideaController.getAllIdeas();
             ideas = ideaManager.getTestIdeas();
        } catch (Exception e) {
            log.log(Level.SEVERE, "Ein Fehler ist bei der Abfrage aller Ideen" +
                    " aus der Datenbank aufgetreten.\nFehlermeldung: " + e
                    .toString());
            return;
        }

        long maxLikes = Collections.max(ideas, new IdeaLikesComparator()).getNumberLikes();
        long maxFollowers = Collections.max(ideas, new IdeaFollowersComparator()).getNumberFollowers();

        Date oldestPublishDate = Collections.min(ideas, new IdeaAgeComparator()).getPublishDate();
        // alter der ältesten Idee in Sekunden
        long maxAge = (comparableStartTime - oldestPublishDate.getTime()) / 1000;

        // Division durch Null verhindern, wenn noch nichts geliked, gefollowed usw. wurde
        if (maxLikes == 0 ){
            maxLikes = 1;
        }
        if (maxFollowers == 0){
            maxFollowers = 1;
        }
        if (maxAge == 0){
            maxAge = 1;
        }

        for (IIdea idea : ideas){

            double likeRatio = ((double) idea.getNumberLikes()) / maxLikes;
            double followRatio = ((double) idea.getNumberFollowers()) / maxFollowers;
            double ageRatio = ((double)(maxAge -
                    ((comparableStartTime - idea.getPublishDate().getTime()) / 1000)))
                    / maxAge;

            idea.setHotRank(likeRatio * hotRatingLikes +
                    followRatio * hotRatingFollows +
                    ageRatio * hotRatingAge);

            idea.setTrendingRank(likeRatio * trendingRatingLikes +
                    followRatio * trendingRatingFollows +
                    ageRatio * trendingRatingAge);
        }

        try {
            // sorge dafür, dass nicht auf den allIDeasSnapshot zugegriffen wird
            ideaManager.getLockAllIdeasSnapshot().lock();

            // leere den allIDeasSnapshot ...
            ideaManager.getAllIdeasSnapshot().clear();
            // und befülle ihn mit den neu berechneten Rankings
            ideaManager.getAllIdeasSnapshot().addAll(ideas);

            log.log(Level.INFO, "Der Snapshot der Ideenliste wurde erneuert und die Rankings " +
            "neu berechnet.");

            //TODO: Rankings zurück in die DB schreiben
        } finally {
            // gebe den allIdeasSnapshot wieder frei
            ideaManager.getLockAllIdeasSnapshot().unlock();
        }
    }

}
