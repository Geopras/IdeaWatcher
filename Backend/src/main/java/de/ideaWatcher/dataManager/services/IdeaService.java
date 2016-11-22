package main.java.de.ideaWatcher.dataManager.services;

import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import org.bson.Document;

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
        Document foundDoc = dbConnectionService.getCollection().find(eq("_id", ideaId)).first(); 
        
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
    
    public UpdateResult updateIdea(IIdea idea){
        Document newDoc = new Document();
        newDoc = buildIdeaDocument(idea);     
        UpdateResult ur = dbConnectionService.getCollection().replaceOne(Filters.eq("_id", newDoc.get("_id")), newDoc);
        return ur;
    }
    
    public void deleteUser(String ideaId){
        dbConnectionService.getCollection().findOneAndDelete(Filters.eq("_id", ideaId));   
    }
    
}
