package main.java.de.ideaWatcher.dataManager;

import org.bson.Document;

import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.dataManager.services.UserDataGenerator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

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
        System.out.println("Ausgabe: " + ideaList.get(50).getName());
    }

    public static void main(String[] args) throws Exception {

       // createTestData();
        getData();

    }
}
