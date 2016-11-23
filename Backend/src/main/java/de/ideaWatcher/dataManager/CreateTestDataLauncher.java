package main.java.de.ideaWatcher.dataManager;

import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.dataManager.services.TestDataGenerator;
import main.java.de.ideaWatcher.dataManager.services.UserDataGenerator;
import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Stefan on 22.11.2016.
 */
public class CreateTestDataLauncher {

    public static void createTestData() throws Exception {
        TestDataGenerator tdg = new TestDataGenerator();

        /* Testdaten anlegen mit CollectionName und Anzahl der Dokumente
         * Name der Collection festlegen
         * Anzahl der Dokumente festlegen
         *
         */
        tdg.createUsers("usersCollection", 50);


        UserService userService = new UserService("usersCollection");
        List<IUser> usersList = new ArrayList<IUser>();
        usersList = userService.getAllUsers();

        /* Testdaten anlegen mit CollectionName, User-Liste und Anzahl der Dokumente
         * Name der Collection
         * Eine Liste von usern erzeugen
         * Anzahl der Dokumente die erzeugt werden sollen
         */
        tdg.createIdeas("ideasCollection", usersList, 100);


        IdeaService ideaService = new IdeaService("ideasCollection");
        List<IIdea> ideaList = new ArrayList<IIdea>();
        ideaList = ideaService.getAllIdeas();

        // jetzt noch alle TestUser CreatedIdeas und FollowedIdeas anpassen
        tdg.updateAllTestUsers(ideaList, userService);
    }


    public static void getData() throws Exception{
        IdeaService is = new IdeaService("ideasCollection");
        List<IIdea> ideaList = new ArrayList<IIdea>();
        ideaList = is.getAllIdeas();
        // Beispiele
        System.out.println("Gr��e der Liste: " + ideaList.size());
        System.out.println("Ausgabe: " + ideaList.get(49).getName());
    }

    public static void main(String[] args) throws Exception {
        createTestData();
    }

}
