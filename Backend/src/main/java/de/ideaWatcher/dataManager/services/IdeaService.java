package main.java.de.ideaWatcher.dataManager.services;

import java.util.ArrayList;
import java.util.List;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import org.bson.Document;

import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

/**
 * Service fuer Zugriff auf Datenbank
 */
public class IdeaService {

    private DbConnectionService dbConnectionService;

    public IdeaService(String collectionName) {
        this.dbConnectionService = new DbConnectionService(collectionName);
    }
    public List<IIdea> getAllIdeas() throws Exception {
        // ToDo
        // fehlende Fehlerbehandlungen sollten noch hinzugef�gt werden
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        List<Document> ideasDoc = dbConnectionService.getCollection().find().into(new ArrayList<Document>());
        dbConnectionService.closeConnection();
        List<IIdea> ideas = new ArrayList<IIdea>();
        for(Document d : ideasDoc){
            ideas.add(buildIdea(d));
        }
        return ideas;
    }
    
    private IIdea buildIdea( Document ideaDoc){
        IIdea idea = new Idea();
        
        idea.setIdeaId(ideaDoc.getObjectId("_id").toString());
        idea.setName(ideaDoc.getString("name"));
        idea.setDescription(ideaDoc.getString("description"));
        idea.setCategory(ideaDoc.getString("catagory"));
        idea.setCreator(  buildUser( (Document) ideaDoc.get("creator") ) );
        idea.setPublishDate(ideaDoc.getDate("publishedDate"));
        idea.setLanguage(ideaDoc.getString("language"));
        idea.setHotRank(ideaDoc.getDouble("hotRank"));
        idea.setTrendingRank(ideaDoc.getDouble("trendingRank"));
        idea.setLikeUsers((List<String>) ideaDoc.get("likeUsers" ));
        idea.setNumberLikes(ideaDoc.getLong("numberLikes"));
        idea.setFollowerUsers((List<String>) ideaDoc.get("followerUsers"));
        idea.setNumberFollowers(ideaDoc.getLong("numberFollowers"));
        idea.setComments((List<IComment>) ideaDoc.get("comments"));
        idea.setNumberComments(ideaDoc.getLong("numberComments"));

        return idea;
    }
    public void addIdea(IIdea idea) throws Exception {
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        dbConnectionService.getCollection().insertOne(buildIdeaDocument
                (idea));
        dbConnectionService.closeConnection();
    }
    public void addIdeaList(List<IIdea> ideaList) throws Exception {
        List<Document> ideaListDoc = new ArrayList<Document>();
        Document ideaDoc;
        for( IIdea idea : ideaList){
            //ideaListDoc.add(buildIdeaDocument(idea));
            ideaDoc = new Document();
            ideaDoc = buildIdeaDocument(idea);
            ideaListDoc.add(ideaDoc);
        }        
        
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }     
        dbConnectionService.getCollection().insertMany(ideaListDoc);
        dbConnectionService.closeConnection();
    }
    
    private Document buildIdeaDocument(IIdea idea) {
        
        return new Document("name", idea.getName())
            .append("description", idea.getDescription())
            .append("catagory", idea.getCategory())
            .append("creator", buildUserDocument(idea.getCreator()))
            .append("publishedDate", idea.getPublishDate())
            .append("language", idea.getLanguage())
            .append("hotRank", idea.getHotRank())
            .append("trendingRank", idea.getTrendingRank())
            .append("likeUsers", idea.getLikeUsers())
            .append("numberLikes", idea.getNumberLikes())
            .append( "followerUsers", idea.getFollowerUsers())
            .append("numberFollowers", idea.getNumberFollowers())
            .append("comments", idea.getComments())
            .append("numberComments", idea.getNumberComments());
    }
    private Document buildUserDocument(IUser user) {

        return new Document("userName", user.getUserName() )
                .append("password", user.getPassword())
                .append("email", user.getEmail())
                .append("isMailPublic", user.getIsMailPublic())
                .append("surname", user.getSurname())
                .append("firstName", user.getFirstname())
                .append("gender", user.getGender())
                .append("language", user.getLanguage())
                .append("pictureURL", user.getPictureURL())
                .append( "createdIdeas", new ArrayList<Document>()) // statt null eine ArrayList -- noch nicht getestet 17.11.16
                .append("numberCreatedIdeas", user.getNumberCreatedIdeas())
                .append( "followedIdeas", new ArrayList<Document>())  // statt null eine ArrayList -- noch nicht getestet 17.11.16
                .append("numberFollowed", user.getNumberFollowedIdeas());
    }
    
    private IUser buildUser(Document userDoc) {

        IUser user = new User();
        user.setUserName(userDoc.getString("userName"));
        user.setPassword(userDoc.getString("password"));
        user.setEmail(userDoc.getString("email"));
        user.setIsMailPublic(userDoc.getBoolean("isMailPublic"));
        user.setSurname(userDoc.getString("surname"));
        user.setFirstname(userDoc.getString("firstName"));
        user.setGender(userDoc.getString("gender"));
        user.setLanguage(userDoc.getString("language"));
        user.setPictureURL(userDoc.getString("pictureUrl"));
        user.setNumberCreatedIdeas(userDoc.getDouble("numberCreatedIdeas"));
        user.setNumberFollowedIdeas(userDoc.getDouble("numberFollowedIdeas"));
        return user;
    }
    
}
