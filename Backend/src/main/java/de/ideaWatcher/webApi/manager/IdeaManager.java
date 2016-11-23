package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.core.*;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.thread.RankCalculationDaemon;

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

    private static final Logger log = Logger.getLogger( IdeaManager.class.getName() );
    private List<IIdea> allIdeasSnapshot;
    private final Lock lockAllIdeasSnapshot = new ReentrantLock();
    private ScheduledExecutorService rankCalculationScheduler;
    private IIdeaController ideaController;

    public IdeaManager() {

        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
    }

    public void initialize() throws Exception {

        try {
            // initial, bevor der Ranking Algorithmus ein mal durchgelaufen ist,
            // soll der Snapshot mit den letzten Werten aus der Datenbank befüllt werden
            this.allIdeasSnapshot = this.ideaController.getAllIdeas();
            //this.allIdeasSnapshot = getTestIdeas();
        } catch (Exception e) {
            log.log(Level.SEVERE, "Ein Fehler ist bei der Abfrage aller Ideen" +
                    " aus der Datenbank aufgetreten.\nFehlermeldung: " + e
                    .toString());
            throw new Exception("getAllIdeas_error");
        }
        // Starte nun die automatische Erneuerung des allIdeasSnapshots
        startRankCalculationScheduler();
    }

    /**
     * Monitor, der den konkurrierenden Zugriff auf die allIdeasSnapshot-Liste legt
     * @return
     */
    public Lock getLockAllIdeasSnapshot() {
        return lockAllIdeasSnapshot;
    }

    /**
     *  Liste aller Ideen aus der Datenbank ohne vollständige Detailinfos.
     *  Sie dient der Filterung und der Suche.
     *  Detailinfos müssen separat aus der DB geholt werden.
     * @return
     */
    public List<IIdea> getAllIdeasSnapshot() {
        return allIdeasSnapshot;
    }

    public void setAllIdeasSnapshot(List<IIdea> allIdeasSnapshot) {
        this.allIdeasSnapshot = allIdeasSnapshot;
    }

    /**
     * ThreadPool, der RankCalculationDaemon ausführt.
     * @return
     */
    public ScheduledExecutorService getRankCalculationScheduler() {
        return rankCalculationScheduler;
    }

    /**
     * Filtert den vorgehaltenen Snapshot der Ideenliste entsprechend der uebergebenen Suchkriterien
     * @param listType Typ der Liste (HOT, TRENDING, FRESH, CATEGORY,
     *                 MYIDEAS, MYFOLLOWEDIDEAS)
     * @param category Kategorie, nach der gesucht werden soll
     * @param fromRank Bsp.: von Ranking 11
     * @param toRank Bsp.: bis Ranking 20
     * @return
     */
    public List<IIdea> filterIdeas(String listType, String category, int fromRank, int toRank) throws Exception {

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

                if (numberIdeas > 0) {
                    // iteriere durch alle Ideen
                    for (IIdea idea : allIdeasSnapshot) {
                        // suche dabei nach Ideen der gewuenschten Kategorie
                        if (idea.getCategory().equals(category)) {
                            currentRank += 1;

                            // und fuege Sie den Ergebnissen hinzu,
                            // wenn sie im gesuchten Ranking-Bereich liegen
                            if (currentRank >= fromRank) {
                                filteredIdeas.add(idea);
                            }

                            if (currentRank == toRank) {
                                break;
                            }
                        }
                    }
                }
            } else {

                switch (listType) {
                    case "HOT":
                    case "MYFOLLOWEDIDEAS":
                        allIdeasSnapshot.sort(new IdeaHotRankComparator(true));
                        break;
                    case "TRENDING":
                        allIdeasSnapshot.sort(new IdeaTrendingRankComparator(true));
                        break;
                    case "FRESH":
                    case "MYIDEAS":
                        allIdeasSnapshot.sort(new IdeaAgeComparator(true));
                        break;
                }

                // Hole die Ideen aus der sortieren Liste entsprechend der gewünschten Bounds
                for (int i = fromRank - 1; i < toRank; i++) {

                    if (i < allIdeasCount) {
                        filteredIdeas.add(allIdeasSnapshot.get(i));
                    }
                }
            }
        } catch (Exception ex) {
            throw new Exception(ex);
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
        rankCalculationScheduler = Executors.newScheduledThreadPool(1);

        // Füre getAllIdeasSnapshot alle X Timeunits aus mit einer Startverzoegerung von X Timeunits
        rankCalculationScheduler.scheduleAtFixedRate(new RankCalculationDaemon(),
                this.REFRESH_RANKING_TIME,
                this.REFRESH_RANKING_TIME,
                this.REFRESH_RANKING_TIMEUNIT);

    }

    public static void calculateRanking(List<IIdea> ideas){
        double hotRatingLikes = 0.5;
        double hotRatingFollows = 0.3;
        double hotRatingAge = 0.2;
        double trendingRatingLikes = 0.3;
        double trendingRatingFollows = 0.1;
        double trendingRatingAge = 0.6;
        long comparableStartTime = new Date().getTime();

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
    }

    /**
     * Erzeugt eine Liste mit Test-Ideen.
     * @return
     */
    public List<IIdea> getTestIdeas(){
        List<IIdea> ideas = new ArrayList<>();
        Random r = new Random();
        Calendar calendar;

        IUser user = new User();
        user.setUserId("654");
        user.setEmail("email@test.org");
        user.setIsMailPublic(false);
        user.setPictureURL("");
        user.setUserName("Renate Test");

        IComment comment = new Comment();
        comment.setPictureURL("");
        comment.setUserId(user.getUserId());
        comment.setText("Das ist ein Testkommentar. Mal sehn ob man den sieht.");
        comment.setUserName(user.getUserName());

        List<IComment> comments = new ArrayList<>();
        comments.add(comment);

        // erzeuge 100 Testideen
        for (int i = 0; i < 100; i++){

            IIdea newIdea = new Idea();
            calendar =  new GregorianCalendar();

            // Zeitraum letzte 5 Jahre
            calendar.add(Calendar.DAY_OF_MONTH, (-1 * r.nextInt(365 * 5)));

            newIdea.setIdeaId(String.format("%s", i));
            newIdea.setPublishDate(calendar.getTime());
            newIdea.setNumberLikes((long) r.nextInt(1000));
            newIdea.setNumberFollowers((long) r.nextInt(100));
            newIdea.setName("Idee Nummer " + i);
            newIdea.setDescription("Eine ganz tolle Idee");
            newIdea.setComments(comments);
            newIdea.setCreator(new Creator());

            ideas.add(newIdea);
        }

        return ideas;
    }

}
