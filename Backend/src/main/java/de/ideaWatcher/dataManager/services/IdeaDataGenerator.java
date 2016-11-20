package main.java.de.ideaWatcher.dataManager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.bson.Document;

import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;



public class IdeaDataGenerator {
  /*  
    private DbConnectionService dbConnectionService;

    public IdeaDataGenerator() {
        this.dbConnectionService = new DbConnectionService("Ideas");
    }
 */

   // private IdeaService ideaService;
    private UserService userService;
    
    public IdeaDataGenerator( UserService userService) {
      //  this.ideaService = ideaService;
        this.userService = userService;
    }
    public void createRandomUserCollection( int count ) throws Exception{
        List<IUser> userList = new ArrayList<IUser>();
        IUser user = new User();
        
        for(int i = 0; i < count; i++){
            user.setUserName("user"+ i);
            user.setEmail("test"+i+"@tester.de");
            user.setPassword("password" + getRandomDouble(-100.0, 100.0) );
            userList.add(user);
        }
        for( IUser u : userList){
            userService.addUser(u);
        }

    }
    
    public void createRandomIdeaCollection(int count) throws Exception{
        List<String> catagoryList = new ArrayList<>();

        catagoryList.add("business");
        catagoryList.add("computer");
        catagoryList.add("homeAndGarden");
        catagoryList.add("gadet");
        catagoryList.add("sports");
        catagoryList.add("toys");
        catagoryList.add("other");
        
        List<IIdea> ideaList = new ArrayList<IIdea>();
        IIdea idea = new Idea();
        //List<Document> ideaListDoc = new ArrayList<Document>();

        for(int i = 0; i < count; i++){
  
            
            idea.setComments(null);
            idea.setCategory(catagoryList.get(getRandomInt(0,catagoryList.size())));
        //    idea.setCreator("user" + i);
            
        }
        

        String deinFan = "deinFan";

        String name = "meine Idee";
        String descripton = "Es soll...";
        String category = "welche Kategorie?";
        int hotRank = 0;
        int trendingRank = 0;
        int freshRank = 0;
        int numberLikes = 0;
        int numberComments = 0;
        List<Document> likeUsers; // = new ArrayList<Document>();
        List<Document> interestedUsers; // = new ArrayList<Document>();
        Document likeUser; // = new Document();
        Document InterestedUser; // = new Document();
        Document ideas;// = new Document();

      
        int generatedRandomValue = 0;
        int maxValue;
     
        for(int i = 0; i < 100; i++){
            ideas = new Document();
            likeUsers = new ArrayList<Document>();
            interestedUsers = new ArrayList<Document>();
                     
            maxValue = getRandomInt(0, 50);
            for(int like = 0; like < maxValue; like ++){
                likeUser = new Document();
                likeUser.append("userName", deinFan + like);
                likeUsers.add(likeUser);
               
            }
                       
            maxValue = getRandomInt(0, 50);
            for(int interested = 0; interested < maxValue; interested ++){
                InterestedUser = new Document();
  //              InterestedUser.append("userName", user + interested);
                interestedUsers.add(InterestedUser);             
            }
                   
            generatedRandomValue = getRandomInt(0, 1000);
         
            ideas.append("name", name + i)
            .append("descripton", descripton + i)
            .append("category", category)
  //          .append("creater", user + i)
            .append("publishedDate ", "01.01.1800")
            .append("language", "german")
            .append("hotRank", hotRank)
            .append("trendingRank", trendingRank)
            .append("freshRank", freshRank)
            .append("likeUsers", likeUsers)
            .append("numberLikes", likeUsers.size())
            .append("followers", interestedUsers)
            .append("comments", "alles nur bluber... blub..." + generatedRandomValue)
            .append("numberComments", interestedUsers.size());
        
    //        ideaService.addIdeaList(ideaList);

        }
        


        
    }
    private static int getRandomInt(int x_start, int x_end) {
        return ThreadLocalRandom.current().nextInt(x_start, x_end + 1 );
    }
    private static double getRandomDouble(double x_start, double x_end) {
        return ThreadLocalRandom.current().nextDouble(x_start, x_end + 1 );
    }
}
