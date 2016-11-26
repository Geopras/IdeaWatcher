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

        IdeaManager ideaManager = InstanceManager.getIdeaManager();
        IIdeaController ideaController = InstanceManager.getDataManager().getIdeaController();

        List<IIdea> ideas;
        try {
            // Hole die Ideen aus der Datenbank
             ideas = ideaController.getAllIdeasSmart();
             //ideas = ideaManager.getTestIdeas();
        } catch (Exception e) {
            log.log(Level.SEVERE, "Ein Fehler ist bei der Abfrage aller Ideen" +
                    " aus der Datenbank aufgetreten.\nFehlermeldung: " + e
                    .toString());
            return;
        }

        IdeaManager.calculateRanking(ideas);

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

        try{
            ideaController.updateRankings(ideas);
        } catch (Exception e) {
            log.log(Level.SEVERE, "Ein Fehler ist beim Zurückschreiben der aktualisierten Rankings " +
            "in die Datenbank aufgetreten! \nFehlermeldung: " + e
                    .toString());
        }
    }

}
