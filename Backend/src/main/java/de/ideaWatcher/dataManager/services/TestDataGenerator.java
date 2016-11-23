package main.java.de.ideaWatcher.dataManager.services;

import main.java.de.ideaWatcher.dataManager.BCrypt;
import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import main.java.de.ideaWatcher.webApi.manager.IdeaManager;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;


public class TestDataGenerator {

    public String hashPassword(String password) {

        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public List<IUser> createUsers(String collectionName, int count) throws Exception {
        List<IUser> userList = new ArrayList<IUser>();
        UserService userService = new UserService(collectionName);
        userList = createRandomUserList(userService, count);
        userService.addUserList(userList);
        return userList;
    }

    public List<IUser> createRandomUserList(UserService userService, int count) throws Exception {
        Random r = new Random();
        List<IUser> userList = new ArrayList<IUser>();

        List<String> genderList = new ArrayList<>();
        genderList.add("male");
        genderList.add("female");

        List<String> languageList = new ArrayList<>();
        languageList.add("de_DE");
        languageList.add("en_GB");

        List<String> surnameList = new ArrayList<>();
        surnameList.add("Müller");
        surnameList.add("Schmidt");
        surnameList.add("Schneider");
        surnameList.add("Fischer");
        surnameList.add("Meyer");
        surnameList.add("Weber");
        surnameList.add("Hofmann");
        surnameList.add("Wagner");
        surnameList.add("Becker");
        surnameList.add("Schulz");
        surnameList.add("Schulz");
        surnameList.add("Koch");
        surnameList.add("Bauer");
        surnameList.add("Richter");
        surnameList.add("Klein");
        surnameList.add("Schröder");
        surnameList.add("Wolf");
        surnameList.add("Neumann");
        surnameList.add("Schwarz");
        surnameList.add("Schmitz");

        List<String> femaleFirstNameList = new ArrayList<>();
        femaleFirstNameList.add("Ursula");
        femaleFirstNameList.add("Carin");
        femaleFirstNameList.add("Helga");
        femaleFirstNameList.add("Sabine");
        femaleFirstNameList.add("Ingrid");
        femaleFirstNameList.add("Renate");
        femaleFirstNameList.add("Monica");
        femaleFirstNameList.add("Susanne");
        femaleFirstNameList.add("Gisela");
        femaleFirstNameList.add("Petra");

        List<String> maleFirstNameList = new ArrayList<>();
        maleFirstNameList.add("Peter");
        maleFirstNameList.add("Michael");
        maleFirstNameList.add("Thomas");
        maleFirstNameList.add("Andreas");
        maleFirstNameList.add("Wolfgang");
        maleFirstNameList.add("Klaus");
        maleFirstNameList.add("Jürgen");
        maleFirstNameList.add("Günther");
        maleFirstNameList.add("Stefan");
        maleFirstNameList.add("Christian");

        for (int i = 0; i < count; i++) {
            IUser newUser = new User();
            newUser.setUserName("user" + i);
            newUser.setEmail("test" + i + "@tester.de");
            newUser.setPictureURL("./resources/img/user.png");
            newUser.setPassword(userService.hashPassword("Passwort" + i + "!"));

            int randomMailPublic = r.nextInt(2);
            if (randomMailPublic == 1){
                newUser.setIsMailPublic(false);
            } else{
                newUser.setIsMailPublic(true);
            }

            // Erzeuge ein zufälliges Geschlecht
            int intRandomIndex = r.nextInt(genderList.size());
            newUser.setGender(genderList.get(intRandomIndex));

            if (newUser.getGender().equals("female")){
                // Erzeuge einen zufälligen Vornamen
                intRandomIndex = r.nextInt(femaleFirstNameList.size());
                newUser.setFirstname(femaleFirstNameList.get(intRandomIndex));
            } else{
                // Erzeuge einen zufälligen Vornamen
                intRandomIndex = r.nextInt(maleFirstNameList.size());
                newUser.setFirstname(maleFirstNameList.get(intRandomIndex));
            }

            // Erzeuge einen zufälligen Nachnamen
            intRandomIndex = r.nextInt(surnameList.size());
            newUser.setSurname(surnameList.get(intRandomIndex));

            // Erzeuge eine zufällige Sprache
            intRandomIndex = r.nextInt(languageList.size());
            newUser.setLanguage(languageList.get(intRandomIndex));

            userList.add(newUser);
        }
        return userList;
    }

    public void createIdeas(String collectionName, List<IUser> userList, int count) throws Exception {
        List<IIdea> ideaList = new ArrayList<IIdea>();
        IdeaService ideaService = new IdeaService(collectionName);
        ideaList = getTestIdeas(ideaService, count, userList);
        ideaService.addIdeaList(ideaList);
    }

    /**
     * Erzeugt eine Liste mit Test-Ideen.
     *
     * @return
     */
    public List<IIdea> getTestIdeas(IdeaService ideaService, int count, List<IUser> userList) {

        List<IIdea> ideas = new ArrayList<>();
        Random r = new Random();
        Calendar calendar;

        List<String> catagoryList = new ArrayList<>();
        catagoryList.add("business");
        catagoryList.add("computer");
        catagoryList.add("homeAndGarden");
        catagoryList.add("gadget");
        catagoryList.add("sports");
        catagoryList.add("toys");
        catagoryList.add("other");

        List<String> languageList = new ArrayList<>();
        languageList.add("de_DE");
        languageList.add("en_GB");

        String loremIpsum = "Lorem ipsum dolor sit amet, " +
                "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore " +
                "et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et " +
                "justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus " +
                "est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing " +
                "elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam " +
                "erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
                "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

        // erzeuge 100 Testideen
        for (int i = 0; i < count; i++) {

            IIdea newIdea = new Idea();

            newIdea.setName("Idee Nummer " + i);

            // erzeuge eine zufällig lange Description
            String description = loremIpsum;
            int descriptionLenght = r.nextInt(5);
            for (int j = 0; j < descriptionLenght; j++) {
                description += " " + loremIpsum;
            }
            newIdea.setDescription(description);

            // erzeuge eine zufällige Kategorie
            int randomCategoryIndex = r.nextInt(catagoryList.size());
            newIdea.setCategory(catagoryList.get(randomCategoryIndex));

            // erzeuge einen zufälligen Creator
            int randomCreatorIndex = r.nextInt(userList.size());
            newIdea.setCreator(ideaService.userToCreator(userList.get(randomCreatorIndex)));
            // merke mir die Creator-ID
            String creatorID = newIdea.getCreator().getUserId();

            // Erzeuge ein zufälliges Publish-Date
            // Zeitraum letzte 5 Jahre
            calendar = new GregorianCalendar();
            calendar.add(Calendar.DAY_OF_MONTH, (-1 * r.nextInt(365 * 5)));

            newIdea.setPublishDate(calendar.getTime());

            // Erzeuge eine zufällige Sprache
            int randomLanguageIndex = r.nextInt(languageList.size());
            newIdea.setLanguage(languageList.get(randomLanguageIndex));

            // Erzeuge zufällig likes (maximal so viele, wie in der User-Liste)
            int numberLikes = r.nextInt(userList.size());
            newIdea.setNumberLikes((long) numberLikes);
            List<String> likeUsers = new ArrayList<String>();

            for (int j = 0; j < numberLikes; j++) {

                boolean likeUserAdded = false;

                while (!likeUserAdded){
                    int randomLikeUserIndex = r.nextInt(userList.size());
                    String newLikeUser = userList.get(randomLikeUserIndex).getUserId();
                    // der like-User darf nicht der Creator sein
                    // und er darf noch nicht geliked haben
                    if ( !likeUsers.contains(newLikeUser) && !creatorID.equals(newLikeUser) ){
                        likeUsers.add(newLikeUser);
                        likeUserAdded = true;
                    }
                }
            }

            // Erzeuge zufällige followers (maximal halb so viele, wie in der User-Liste)
            int numberFollowers = r.nextInt(userList.size() / 2);
            newIdea.setNumberFollowers((long) numberFollowers);
            List<String> followUsers = new ArrayList<String>();

            for (int j = 0; j < numberFollowers; j++) {

                boolean followUserAdded = false;

                while (!followUserAdded){
                    int randomFollowUserIndex = r.nextInt(userList.size());
                    IUser newFollowUser = userList.get(randomFollowUserIndex);
                    // der follow-User darf nicht der Creator sein
                    // und er darf noch nicht gefollowed haben
                    if ( !followUsers.contains(newFollowUser.getUserId()) &&
                            !creatorID.equals(newFollowUser.getUserId()) ){

                        followUsers.add(newFollowUser.getUserId());
                        followUserAdded = true;

                    }
                }
                // TODO: hier muss noch jeder User aktualisiert werden
            }

            // Erzeuge zufällige Comments
            int numberComments = r.nextInt(11);
            List<IComment> commentList = new ArrayList<IComment>();
            calendar.setTime(newIdea.getPublishDate());

            for (int j = 0; j < numberComments; j++) {

                IComment newComment = new Comment();

                newComment.setCommentId(java.util.UUID.randomUUID().toString());

                String commentText = "bla";
                int randomTextLenght = r.nextInt(100);
                for (int k = 0; k < randomTextLenght; k++){
                    commentText += " bla";
                }
                newComment.setText(commentText);

                int randomCommentCreatorIndex = r.nextInt(userList.size());
                IUser commentUser = userList.get(randomCommentCreatorIndex);

                newComment.setUserId(commentUser.getUserId());
                newComment.setUserName(commentUser.getUserName());

                // jeden Tag nen neuen Comment
                calendar.add(Calendar.DAY_OF_MONTH, (1));
                newComment.setPublishDate(calendar.getTime());

                newComment.setPictureURL(commentUser.getPictureURL());

                commentList.add(newComment);
            }

            newIdea.setNumberComments((long) numberComments);
            newIdea.setComments(commentList);


            ideas.add(newIdea);
        }

        IdeaManager.calculateRanking(ideas);

        return ideas;
    }

}
