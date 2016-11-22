package main.java.de.ideaWatcher.dataManager;

import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.dataManager.services.UserDataGenerator;
import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.result.UpdateResult;

public class TestLauncher {

    public static void createTestData() throws Exception{
        UserDataGenerator udg = new UserDataGenerator();

        /* Testdaten anlegen mit CollectionName und Anzahl der Dokumente
         * Name der Collection festlegen
         * Anzahl der Dokumente festlegen
         *
         */
        udg.createUsers("usersCollection", 50);

        /* Testdaten anlegen mit CollectionName, User-Liste und Anzahl der Dokumente
         * Name der Collection
         * Eine Liste von usern erzeugen
         * Anzahl der Dokumente die erzeugt werden sollen
         */
        udg.createIdeas("ideasCollection", udg.createRandomUserList(50), 50);

    }
    public static void getData() throws Exception{
        IdeaService is = new IdeaService("ideasCollection");
        List<IIdea> ideaList = new ArrayList<IIdea>();
        ideaList = is.getAllIdeas();
        // Beispiele
        System.out.println("Größe der Liste: " + ideaList.size());
        System.out.println("Ausgabe: " + ideaList.get(49).getName());
    }
    public static IUser getUser() throws Exception{
        UserService us = new UserService("usersCollection");
        IUser user = new User();
        user = us.getUser("58346be56f963f1770997256");
        return user;
        
    }
    public static void updateUser(IUser user){
        UserService us = new UserService("usersCollection");
        UpdateResult ur = us.updateUser(user);
        System.out.println(ur.getMatchedCount());
        System.out.println(ur.getModifiedCount());
        System.out.println(ur.getUpsertedId());
    }

    public static void main(String[] args) throws Exception {

       //createTestData();
       //getData();

        //System.out.println("Ausgabe: "+ getUser().getUserName());
        IUser user = new User();
        user = getUser();
        user.setFirstname("Heinz Rudolf Blödian");
        
        System.out.println(user.getFirstname());
        System.out.println(user.getUserId());
        updateUser(user);
        
    }
}
