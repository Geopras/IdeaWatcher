package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.core.*;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
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

    public final int REFRESH_RANKING_TIME = 10;
    public final TimeUnit REFRESH_RANKING_TIMEUNIT = TimeUnit.SECONDS;

    private static final Logger log = Logger.getLogger( IdeaManager.class.getName() );
    private List<IIdea> allIdeasSnapshot;
    private final Lock lockAllIdeasSnapshot = new ReentrantLock();
    private ScheduledExecutorService rankCalculationScheduler;
    private IIdeaController ideaController;
    private IUserController userController;

    public IdeaManager() {

        this.ideaController = InstanceManager.getDataManager()
                .getIdeaController();
        this.userController = InstanceManager.getDataManager()
                .getUserController();
    }

    public void initialize() throws Exception {

        try {
            // initial, bevor der Ranking Algorithmus ein mal durchgelaufen ist,
            // soll der Snapshot mit den letzten Werten aus der Datenbank befüllt werden
            this.allIdeasSnapshot = this.ideaController.getAllIdeasSmart();
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
     * @return
     */
    public List<IIdea> filterIdeas(List<IIdea> ideasToFilter, int fromRank, int toRank) {

        List<IIdea> filteredIdeas = new ArrayList<>();

        int countIdeasToFilter = ideasToFilter.size();

        //region Vorprüfung, ob Filterung möglich:
        if (fromRank > countIdeasToFilter) {
            log.log(Level.SEVERE, "Der übergebene fromRank ist größer als " +
                    "die Anzahl der zu filternden Ideen. Es kann nicht gefiltert werden. " +
                    "fromRank: " + fromRank + ", Anzahl Ideen:" + countIdeasToFilter);
            return filteredIdeas;
        }
        //endregion

        if (toRank > countIdeasToFilter) {
            toRank = countIdeasToFilter;
        }

        // // Filtere die Ideen anhand des gewünschten Ranking-Bereichs heraus
        filteredIdeas.addAll(ideasToFilter.subList(fromRank - 1, toRank));

        return filteredIdeas;
    }

    public List<IIdea> getMyIdeas(String userId) throws Exception {

        List<IIdea> myIdeas = new ArrayList<>();

        // Suche anhand der userId die Liste von IdeenIDs der von dem User
        // erstellten Ideen aus der Datenbank
        IUser user = this.userController.getUser(userId);
        List<String> userIdeaIds = user.getCreatedIdeas();

        // Anhand der herausgesuchten IdeenIDs sollen die Ideen rausgesucht werden
        for (String userIdeaId : userIdeaIds) {
            myIdeas.add(this.ideaController.getIdea(userIdeaId));
        }

        return myIdeas;
    }

    public List<IIdea> getMyFollowedIdeas(String userId) throws Exception {

        List<IIdea> myFollowedIdeas = new ArrayList<>();

        // Suche anhand der userId die Liste von IdeenIDs der von dem User
        // erstellten Ideen aus der Datenbank
        IUser user = this.userController.getUser(userId);
        List<String> followedIdeaIds = user.getFollowedIdeas();

        // Anhand der herausgesuchten IdeenIDs sollen die Ideen rausgesucht werden
        for (String followedIdeaId : followedIdeaIds) {
            myFollowedIdeas.add(this.ideaController.getIdea(followedIdeaId));
        }

        return myFollowedIdeas;
    }

    public List<IIdea> getMySearchedIdeas(String searchText) throws Exception {

        return this.ideaController.searchIdeas(searchText);
    }

    public List<IIdea> getCategorizedIdeas(String category) throws Exception {

        if (category.equals("NONE")) {
            return this.ideaController.getPublishedIdeas();
        } else {
            return this.ideaController.getPublishedCategorizedIdeas(category);
        }
    }

    public List<IIdea> sortIdeas(List<IIdea> ideasToSort, String listType) {

        switch (listType) {
            case "HOT":
            case "MYFOLLOWEDIDEAS":
            case "MYSEARCH":
                ideasToSort.sort(new IdeaHotRankComparator(true));
                break;
            case "TRENDING":
                ideasToSort.sort(new IdeaTrendingRankComparator(true));
                break;
            case "FRESH":
            case "MYIDEAS":
                ideasToSort.sort(new IdeaAgeComparator(true));
                break;
        }
        return ideasToSort;
    }

    /**
     * Löscht eine Idee aus dem allIdeasSnapshot und berücksichtigt dabei den kritischen Abschnitt
     * @param ideaId
     */
    public void deleteIdeaFromSnapshot(String ideaId) throws Exception{

        try {
            //während des Löschens darf sich der AllIdeasSnapshot nicht verändern
            lockAllIdeasSnapshot.lock();

            IIdea ideaToBeDeleted = null;

            for (IIdea idea : this.allIdeasSnapshot){
                if (idea.getIdeaId().equals(ideaId)){
                    ideaToBeDeleted = idea;
                    break;
                }
            }

            if (ideaToBeDeleted != null){
                allIdeasSnapshot.remove(ideaToBeDeleted);
            }

        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            lockAllIdeasSnapshot.unlock();
        }

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

    public void updateIdea() {

    }

}
