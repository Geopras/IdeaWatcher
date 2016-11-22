package main.java.de.ideaWatcher.dataManager.services;

import main.java.de.ideaWatcher.dataManager.BCrypt;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;


public class TestDataGenerator {

    public String hashPassword(String password) {

        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public List<IUser> createUsers(String collectionName, int count) throws Exception{
        List<IUser> userList = new ArrayList<IUser>();
        userList = createRandomUserList(count);
        UserService us = new UserService(collectionName);
        us.addUserList(userList);
        return userList;
    }

    public List<IUser> createRandomUserList( int count ) throws Exception{
        List<IUser> userList = new ArrayList<IUser>();
        IUser user;

        for(int i = 0; i < count; i++){
            user = new User();
            user.setUserName("user"+ i);
            user.setEmail("test"+i+"@tester.de");
            user.setPassword("password" + getRandomDouble(-100.0, 100.0) );
            user.setIsMailPublic(false);
            userList.add(user);
        }
        return userList;
    }
    public void createIdeas (String collectionName, List<IUser> userList, int count) throws Exception{
        List<IIdea> ideaList = new ArrayList<IIdea>();
        IdeaService is = new IdeaService(collectionName);
        ideaList = createRandomIdeaCollection(count, userList);
        is.addIdeaList(ideaList);
    }

    private List<IIdea> createRandomIdeaCollection(int count, List<IUser> userList) throws Exception{




        List<IComment> commentList = new ArrayList<IComment>();
        //Comment comment = new Comment();

        List<String> catagoryList = new ArrayList<>();
        catagoryList.add("business");
        catagoryList.add("computer");
        catagoryList.add("homeAndGarden");
        catagoryList.add("gadget");
        catagoryList.add("sports");
        catagoryList.add("toys");
        catagoryList.add("other");

        List<IIdea> ideaList = new ArrayList<IIdea>();
        IIdea idea = new Idea();

        List<String> nameList = new ArrayList<String>();

        int ranNumber = 0;

        for(int i = 0; i < count; i++){
            idea = new Idea();
            ranNumber = getRandomInt(0, userList.size());
            for (int r = 0; r < ranNumber; r++){
                nameList.add(userList.get(r).getUserName());
            }
            ranNumber = getRandomInt(0, userList.size()-1);
            idea.setComments(commentList);
            ranNumber = getRandomInt(0, catagoryList.size()-1);
            idea.setCategory(catagoryList.get(ranNumber));
            ranNumber = getRandomInt(0, userList.size()-1);
            //idea.setCreator(userList.get(ranNumber));
            idea.setDescription("Meine Idee Nummer: " + i);
            idea.setFollowerUsers(nameList);
            idea.setNumberFollowers((long) nameList.size());
            idea.setHotRank(0);
            idea.setLanguage("deutsch");
            nameList = new ArrayList<String>();
            ranNumber = getRandomInt(0, userList.size()-1);
            for (int r = 0; r < ranNumber; r++){
                nameList.add(userList.get(r).getUserName());
            }
            idea.setLikeUsers(nameList);
            idea.setName("Klobuerste"+i);
            idea.setNumberComments(0l);
            idea.setPublishDate(new Date(System.currentTimeMillis()));
            idea.setTrendingRank(0.0);

            ideaList.add(idea);
        }
        return ideaList;
    }

    /**
     * Erzeugt eine Liste mit Test-Ideen.
     * @return
     */
    public List<IIdea> getTestIdeas(int count, List<IUser> userList){
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

        // erzeuge 100 Testideen
        for (int i = 0; i < 100; i++){

            IIdea newIdea = new Idea();
            calendar =  new GregorianCalendar();

            // Zeitraum letzte 5 Jahre
            calendar.add(Calendar.DAY_OF_MONTH, (-1 * r.nextInt(365 * 5)));

            newIdea.setIdeaId(String.format("%s", i));
            newIdea.setPublishDate(calendar.getTime());



            newIdea.setNumberLikes((long) r.nextInt(1000));

            int numberLikes = getRandomInt(0, userList.size());
//            for (int r = 0; r < ranNumber; r++){
//                nameList.add(userList.get(r).getUserName());
//            }

            newIdea.setNumberFollowers((long) r.nextInt(100));
            newIdea.setName("Idee Nummer " + i);
            newIdea.setDescription("Eine ganz tolle Idee");

            ideas.add(newIdea);
        }

        return ideas;
    }


    private static int getRandomInt(int x_start, int x_end) {
        return ThreadLocalRandom.current().nextInt(x_start, x_end + 1 );
    }
    private static double getRandomDouble(double x_start, double x_end) {
        return ThreadLocalRandom.current().nextDouble(x_start, x_end + 1 );
    }

}
