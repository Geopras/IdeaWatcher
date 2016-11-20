package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.core.*;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.workflow.LoginWorkflow;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Führt in regelmäßigen Abständen den Ranking-Algorithmus aus
 * und hält einen Snapshot der Ideenliste im Speicher, der für
 * sämtliche Filterabfragen verwendet wird.
 */
public class IdeaManager {

    public final int REFRESH_RANKING_TIME = 30;
    public final TimeUnit REFRESH_RANKING_TIMEUNIT = TimeUnit.SECONDS;

    private static final Logger log = Logger.getLogger( LoginWorkflow.class.getName() );

    // Liste aller Ideen aus der Datenbank ohne vollständige Detailinfos.
    // Sie dient der Filterung und der Suche.
    // Detailinfos müssen separat aus der DB geholt werden.
    private List<IIdea> allIdeasSnapshot;

    // Monitor, der den konkurrierenden Zugriff auf die allIdeasSnapshot-Liste legt
    private final Lock lockAllIdeasSnapshot = new ReentrantLock();

    private IIdeaController ideaController;

    public IdeaManager() {

        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
    }

    public void initialize() throws Exception {
        // initial, bevor der Ranking Algorithmus ein mal durchgelaufen ist,
        // soll der Snapshot mit den letzten Werten aus der Datenbank befüllt werden
        allIdeasSnapshot = getTestIdeas();

//        try {
//            this.allIdeasSnapshot = this.ideaController.getAllIdeas();
//        } catch (Exception e) {
//            log.log(Level.SEVERE, "Ein Fehler ist bei der Abfrage aller Ideen" +
//                    " aus der Datenbank aufgetreten.\nFehlermeldung: " + e
//                    .toString());
//            throw new Exception("getAllIdeas_error");
//        }
        // Starte nun die automatische Erneuerung des allIdeasSnapshots
        startRankCalculationScheduler();
    }

    /**
     * Filtert den vorgehaltenen Snapshot der Ideenliste entsprechend der uebergebenen Suchkriterien
     * @param listType Typ der Liste (HOT, TRENDING, FRESH, CATEGORY)
     * @param category Kategorie, nach der gesucht werden soll
     * @param fromRank Bsp.: von Ranking 11
     * @param toRank Bsp.: bis Ranking 20
     * @return
     */
    public List<IIdea> filterIdeas(String listType, String category, int fromRank, int toRank){

        List<IIdea> filteredIdeas = new ArrayList<>();

        try {
            //während des Filterns darf sich der AllIdeasSnapshot nicht verändern
            lockAllIdeasSnapshot.lock();

            long allIdeasCount = allIdeasSnapshot.size();

            if (listType.equals("CATEGORY")){

                // die Kategorie-Listen werden nach Hot-Ranking sortiert
                allIdeasSnapshot.sort(new IdeaHotRankComparator(true));

                int numberIdeas = toRank - fromRank + 1;
                int currentRank = 0;

                if (numberIdeas > 0){
                    // iteriere durch alle Ideen
                    for (IIdea idea:allIdeasSnapshot){
                        // suche dabei nach Ideen der gewuenschten Kategorie
                        if (idea.getCategory().equals(category)){
                            currentRank += 1;

                            // und fuege Sie den Ergebnissen hinzu,
                            // wenn sie im gesuchten Ranking-Bereich liegen
                            if (currentRank >= fromRank){
                                filteredIdeas.add(idea);
                            }

                            if (currentRank == toRank){
                                break;
                            }
                        }
                    }
                }
            } else {

                switch (listType){
                    case "HOT":
                        allIdeasSnapshot.sort(new IdeaHotRankComparator(true));
                        break;
                    case "TRENDING":
                        allIdeasSnapshot.sort(new IdeaTrendingRankComparator(true));
                        break;
                    case "FRESH":
                        allIdeasSnapshot.sort(new IdeaAgeComparator(true));
                        break;
                }

                // Hole die Ideen aus der sortieren Liste entsprechend der gewünschten Bounds
                for (int i = fromRank - 1; i < toRank; i++){

                    if (i < allIdeasCount){
                        filteredIdeas.add(allIdeasSnapshot.get(i));
                    }
                }
            }
        } finally {
            lockAllIdeasSnapshot.unlock();
        }

        return filteredIdeas;
    }

    /**
     * Startet den Scheduler für
     * setzt die hotRankings und trendingRankings
     */
    private void startRankCalculationScheduler(){
        //Erstelle einen ThreadPool, der einen Tread enthält
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        Runnable getAllIdeasSnapshot = () -> {

            double hotRatingLikes = 0.5;
            double hotRatingFollows = 0.3;
            double hotRatingAge = 0.2;
            double trendingRatingLikes = 0.3;
            double trendingRatingFollows = 0.1;
            double trendingRatingAge = 0.6;
            long comparableStartTime = new Date().getTime();

            // TODO: die Ideen müssen aus dem DataManager geholt werden
            // Hole die Ideen aus der Datenbank
            // hier wird erstmal nur mit Testideen gearbeitet
            List<IIdea> ideas = new ArrayList<>(); //
            try {
                ideas = getTestIdeas(); //this.ideaController.getAllIdeas(); //
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
                lockAllIdeasSnapshot.lock();

                // leere den allIDeasSnapshot ...
                allIdeasSnapshot.clear();
                // und befülle ihn mit den neu berechneten Rankings
                allIdeasSnapshot.addAll(ideas);

                //TODO: Rankings zurück in die DB schreiben
            } finally {
                // gebe den allIdeasSnapshot wieder frei
                lockAllIdeasSnapshot.unlock();
            }
        };

        // Füre getAllIdeasSnapshot alle X Timeunits aus mit einer Startverzoegerung von X Timeunits
        scheduler.scheduleAtFixedRate(getAllIdeasSnapshot,
                0,
                this.REFRESH_RANKING_TIME,
                this.REFRESH_RANKING_TIMEUNIT);
    }

    /**
     * Erzeugt eine Liste mit Test-Ideen.
     * @return
     */
    public List<IIdea> getTestIdeas(){
        List<IIdea> ideas = new ArrayList<>();
        Random r = new Random();
        Calendar calendar;

        // erzeuge 100 Testideen
        for (int i = 0; i < 100; i++){

            IIdea newIdea = new Idea();
            calendar =  new GregorianCalendar();

            // Zeitraum letzte 5 Jahre
            calendar.add(Calendar.DAY_OF_MONTH, (-1 * r.nextInt(365 * 5)));

            newIdea.setIdeaID(String.format("%s", i));
            newIdea.setPublishDate(calendar.getTime());
            newIdea.setNumberLikes((long) r.nextInt(1000));
            newIdea.setNumberFollowers((long) r.nextInt(100));
            newIdea.setName("Idee Nummer " + i);
            newIdea.setDescription("Eine ganz tolle Idee");

            ideas.add(newIdea);
        }

        return ideas;
    }

}
