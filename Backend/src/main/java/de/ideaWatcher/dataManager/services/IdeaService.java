package main.java.de.ideaWatcher.dataManager.services;

import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

/**
 * Service fuer Zugriff auf Datenbank
 */
public class IdeaService {

    private DbConnectionService dbConnectionService;

    public IdeaService(String collectionName) {
        this.dbConnectionService = new DbConnectionService(collectionName);
    }
    
    private Document buildCreatorDocument(ICreator creator) {
        return new Document("userName", creator.getUserName() )
                .append("email", creator.getEmail())
                .append("isMailPublic", creator.getIsMailPublic())
                .append("pictureURL", creator.getPictureURL());
    }
    
    private ICreator buildCreator(Document creatorDoc) {
        ICreator creator = new Creator();
        creator.setUserName(creatorDoc.getString("userName"));
        creator.setEmail(creatorDoc.getString("email"));
        creator.setIsMailPublic(creatorDoc.getBoolean("isMailPublic"));
        creator.setPictureURL(creatorDoc.getString("pictureUrl"));
        return creator;
    }
    
    public IIdea getIdea( String ideaId ) throws Exception {
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        Document foundDoc = dbConnectionService.getCollection().find(eq("_id", new ObjectId (ideaId))).first(); 
        
        dbConnectionService.closeConnection();
        return buildIdea(foundDoc);
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
        idea.setCreator(  buildCreator( (Document) ideaDoc.get("creator") ) );
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

    public void addIdea(IIdea idea, String userId) throws Exception {
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
        // ID wird nicht übertragen, da von MongoDB erzeugt!
        return new Document("name", idea.getName())
            .append("description", idea.getDescription())
            .append("catagory", idea.getCategory())
            .append("creator", buildCreatorDocument(idea.getCreator()))
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
    
    public UpdateResult updateIdea(IIdea idea) throws Exception{
        Document newDoc = new Document();
        newDoc = buildIdeaDocument(idea);
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        } 
        UpdateResult ur = dbConnectionService.getCollection().replaceOne(Filters.eq("_id", new ObjectId (idea.getIdeaId())), newDoc);
        dbConnectionService.closeConnection();
        return ur;
    }
    
    public void deleteIdea(String ideaId) throws Exception{
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        } 
        dbConnectionService.getCollection().findOneAndDelete(Filters.eq("_id", new ObjectId (ideaId)));
        dbConnectionService.closeConnection();
    }
    
    public ICreator userToCreator(IUser user){
        ICreator creator = new Creator();
        creator.setUserId(user.getUserId());
        creator.setUserName(user.getUserName());
        creator.setEmail(user.getEmail());
        creator.setIsMailPublic(user.getIsMailPublic());
        creator.setPictureURL(user.getPictureURL());
        return creator;
    }
    public void updateApropertyOfaIdea(String ideaId, String type, String value) throws Exception{
       
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        } 
        dbConnectionService.getCollection().updateOne(eq("_id", new ObjectId(ideaId)), new Document("$set", new Document(type, value)));
        dbConnectionService.closeConnection();
    }
    
    public IIdea buildIdeaToIdeaSmart( IIdea idea){
        IIdea ideaSmart = new Idea();
        ideaSmart.setCategory(idea.getCategory());
        ideaSmart.setCreator(idea.getCreator());
        ideaSmart.setHotRank(idea.getHotRank());
        ideaSmart.setIdeaId(idea.getIdeaId());
        ideaSmart.setName(idea.getName());
        ideaSmart.setNumberComments(idea.getNumberComments());
        ideaSmart.setNumberFollowers(idea.getNumberFollowers());
        ideaSmart.setNumberLikes(idea.getNumberLikes());
        ideaSmart.setPublishDate(idea.getPublishDate());
        ideaSmart.setTrendingRank(idea.getTrendingRank());
        
        return ideaSmart;
    }
    
    
    public IIdea getIdeaSmart( String ideaId) throws Exception{
        IIdea ideaSmart = new Idea();
        ideaSmart = buildIdeaToIdeaSmart(getIdea(ideaId));    
        return ideaSmart;
    }
    
    public List<IIdea> getAllIdeasSmart() throws Exception{
        List<IIdea> ideasSmart = new ArrayList<IIdea>();
        List<IIdea> ideas = new ArrayList<IIdea>();
        ideas = getAllIdeas();
        for(IIdea idea : ideas){
            ideasSmart.add(buildIdeaToIdeaSmart(idea));
        }
        
        return ideasSmart; 
    }
    
}
