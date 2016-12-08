package main.java.de.ideaWatcher.dataManager;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;
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
        user = us.getUser("5839a34b6bd8bf1dc0c9a6be");
        return user;
        
    }
    public static void updateUser(IUser user) throws Exception{
       UserService us = new UserService("usersCollection");
       UpdateResult ur = us.updateUser(user);
       System.out.println("Datensätze gefunden: " + ur.getMatchedCount());
       System.out.println("Datensätze modifiziert: " + ur.getModifiedCount());       
    }
    public static void deleteUser(IUser user) throws Exception{
        UserService us = new UserService("usersCollection");
        us.deleteUser(user.getUserId());
    }
    
    public static IIdea getIdea() throws Exception{
        IdeaService is = new IdeaService("ideasCollection");
        IIdea idea = new Idea();
        idea = is.getIdea("58346be56f963f1770997289");
        return idea;
    }
    
    public static void updateIdea(IIdea idea) throws Exception{
        IdeaService is = new IdeaService("ideasCollection");
        UpdateResult ur = is.updateIdea(idea);
        System.out.println("Datensätze gefunden: " + ur.getMatchedCount());
        System.out.println("Datensätze modifiziert: " + ur.getModifiedCount());       
     }
     public static void deleteIdea (IIdea idea) throws Exception{
         IdeaService is = new IdeaService("ideasCollection");
         is.deleteIdea(idea.getIdeaId());
     }
     public static void deleteIdea (String ideaId) throws Exception{
         IdeaService is = new IdeaService("ideasCollection");
         is.deleteIdea(ideaId);
     }
     public static void updateApropertyOfaIdea( ) throws Exception{
       //  ObjectId("58346be56f963f177099728a")
         String ideaId = "58346be56f963f177099728a";
         String type = "trendingRank";
         String value = "10.0";
         IdeaService is = new IdeaService("ideasCollection");
         
         is.updateApropertyOfaIdea(ideaId, type, value);
     }
     public static List<IUser> getUserList(String type, String value) throws Exception{
         String collectionName = "usersCollection";
         //DbConnectionManager dbConnectionService = new DbConnectionManager(collectionName);
         UserService us = new UserService(collectionName);
         return us.getUserList(type, value);
 
     }


    public static void main(String[] args) throws Exception {
/*
 *  in den statischen Methode getIdea() und getUser() müssen gültige ObjektId 
 *  angegeben werden für das Testen 
 * 

        IUser user = new User();
        user = getUser();
        user.setFirstname("Heinz Rudolf Blödian3");
        user.setPictureURL("Link");
        updateUser(user);
        deleteUser(getUser());
        createTestData();
        getData();
        IIdea idea = new Idea();
        idea = getIdea();
        idea.setLanguage("english");
        updateIdea(idea);
        deleteIdea(idea);
        updateApropertyOfaIdea( );
        
        IdeaService is = new IdeaService("ideasCollection");
        UserService us = new UserService("usersCollection");
        // creator.$.userName
        List<IIdea> ideaList = is.getIdeaList("creator.userName", "user19");
        for(IIdea doc : ideaList){
            System.out.println("Ausgabe: " + doc.getCreator().getIsMailPublic());
        }

      us.updateApropertyOfaUser("5839a34b6bd8bf1dc0c9a6be", "isMailPublic", "true");
      is.updateModifiedIsMailPublic(ideaList);
      
      //System.out.println("user: "  + us.getUser("5839a34b6bd8bf1dc0c9a6be"));

        ideaList = is.getIdeaList("creator.userName", "user19");
        for(IIdea doc : ideaList){
           System.out.println("Ausgabe: " + doc.getCreator().getIsMailPublic());
        }              
        IUser user = new User();
        user = getUser();      
        System.out.println(user.getIsMailPublic());    
        user.setIsMailPublic(false);
        updateUser(user);
        user = getUser();
        System.out.println("userDocument - Public: " + user.getIsMailPublic());
        
        
        List<IUser> userList = new ArrayList<>();
        userList = getUserList("followedIdeas", value);
        System.out.println("Größe der Liste: " + userList.size());
        for(IUser user : userList){
            System.out.println(user.getUserName() + " --  " + user.getUserId());
            for (String ideaId : user.getFollowedIdeas()){
                System.out.println("IdeaId: " + ideaId);
            }
                
            user.getFollowedIdeas().remove(value);
        }
        for(IUser user : userList){
            System.out.println(user.getUserName() + " --  " + user.getUserId());
            for (String ideaId : user.getFollowedIdeas()){
                System.out.println("IdeaId: " + ideaId);
            }
        }
        */

        String value = "583ac70f6bd8bf1b8855930e";
         deleteIdea(value);
        List<IUser> userList = new ArrayList<>();
        userList = getUserList("followedIdeas", value);
        System.out.println("Größe der Liste: " + userList.size());
        for(IUser user : userList){
            System.out.println(user.getUserName() + " --  " + user.getUserId());
            for (String ideaId : user.getFollowedIdeas()){
                System.out.println("IdeaId: " + ideaId);
            }
        }       
        
    }
}
