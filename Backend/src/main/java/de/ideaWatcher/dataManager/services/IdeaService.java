package main.java.de.ideaWatcher.dataManager.services;

import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

/**
 * Service fuer Zugriff auf Datenbank
 */
public class IdeaService {

    private DbConnectionService dbConnectionService;

    public IdeaService(String collectionName) {
        this.dbConnectionService = new DbConnectionService(collectionName);
    }
    
    /**
     * baut Creator in Document um
     * @param creator {ICreator} ein User Objekt
     * @return {Document} gibt ein Creator Document zurück
     */  
    private static Document buildCreatorDocument(ICreator creator) {
        return new Document("userId", creator.getUserId() )
                .append("userName", creator.getUserName())
                .append("email", creator.getEmail())
                .append("isMailPublic", creator.getIsMailPublic())
                .append("pictureURL", creator.getPictureURL());
    }
    
    /**
     * baut Document in ICreator um
     * @param creatorDoc {Document} ein Document Objekt
     * @return {ICreator} gibt ein Creator Objekt zurück
     */ 
    public static ICreator buildCreator(Document creatorDoc) {
        ICreator creator = new Creator();
        creator.setUserId(creatorDoc.getString("userId"));
        creator.setUserName(creatorDoc.getString("userName"));
        creator.setEmail(creatorDoc.getString("email"));
        creator.setIsMailPublic(creatorDoc.getBoolean("isMailPublic"));
        creator.setPictureURL(creatorDoc.getString("pictureUrl"));
        return creator;
    }

    /**
     * baut IComment in Document um
     * @param comment {IComment} ein IComment Objekt
     * @return {Document} gibt ein Creator Objekt zurück
     */ 
    private Document buildCommentDocument(IComment comment) {
        return new Document("commentId", comment.getCommentId() )
                .append("userName", comment.getUserName())
                .append("userId", comment.getUserId())
                .append("text", comment.getText())
                .append("pictureURL", comment.getPictureURL())
                .append("publishDate", comment.getPublishDate());
    }
    
    /**
     * baut Document in IComment um
     * @param commentDoc {Document} ein Document Objekt
     * @return {IComment} gibt ein Comment Objekt zurück
     */ 
    public static IComment buildComment(Document commentDoc) {
        IComment comment = new Comment();
        comment.setCommentId(commentDoc.getString("commentId"));
        comment.setUserId(commentDoc.getString("userId"));
        comment.setUserName(commentDoc.getString("userName"));
        comment.setText(commentDoc.getString("text"));
        comment.setPublishDate(commentDoc.getDate("publishDate"));
        comment.setPictureURL(commentDoc.getString("pictureUrl"));
        return comment;
    }
    
    /**
     * baut Document in IComment um
     * @param commentList {List<IComment>} Liste von Comment Objekt
     * @return {List<Document>} gibt eine Liste von Documenten zurück
     */ 
    private List<Document> buildCommentDocumentList(List<IComment> commentList){
        List<Document> commentDocList = new ArrayList<Document>();
        for (IComment comment : commentList){
            commentDocList.add(buildCommentDocument(comment));
        }
        return commentDocList;
    }
    
    /**
     * baut List<Document> in List<IComment> um
     * @param commentDocList {List<IComment>} Liste von Comment Objekt
     * @return {List<IComment>} gibt eine Liste von IComment zurück
     */ 
    private List<IComment> buildCommentList(List<Document> commentDocList){

        List<IComment> commentList = new ArrayList<IComment>();

        for (Document document : commentDocList){
            commentList.add(buildComment(document));
        }

        return commentList;
    }
    /**
     * gibt eine Idea zurück
     * @param ideaId {String} ID einer Idea
     * @return {String} gibt die Idea zurück
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */ 
    public IIdea getIdea( String ideaId ) throws Exception {
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        try {
            Document foundDoc = dbConnectionService.getCollection()
                    .find(eq("_id", new ObjectId (ideaId))).first();
            return buildIdea(foundDoc);
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }
    
    /**
     * gibt eine Liste von allen Ideen zurück
     * @return {List<IIdea>} gibt die Liste zurück
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */    
    public List<IIdea> getAllIdeas() throws Exception {

        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        List<Document> ideasDoc;
        try {
            ideasDoc = dbConnectionService.getCollection().find().into(new
                    ArrayList<>());
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
        List<IIdea> ideas = new ArrayList<>();
        for(Document d : ideasDoc){
            ideas.add(buildIdea(d));
        }
        return ideas;
    }
    
    /**
     * baut ein Idea-Document um in ein IIdea Objekt
     * @param ideaDoc {Document} Document einer Idea
     * @return {IIdea} gibt die Idea zurück
     */    
    public static IIdea buildIdea( Document ideaDoc){
        IIdea idea = new Idea();
        
        idea.setIdeaId(ideaDoc.getObjectId("_id").toString());
        idea.setName(ideaDoc.getString("name"));
        idea.setDescription(ideaDoc.getString("description"));
        idea.setCategory(ideaDoc.getString("catagory"));
        idea.setCreator(  buildCreator( (Document) ideaDoc.get("creator") ) );
        idea.setPublishDate(ideaDoc.getDate("publishedDate"));
        idea.setIsPublished(ideaDoc.getBoolean("isPublished"));
        idea.setLanguage(ideaDoc.getString("language"));
        idea.setHotRank(ideaDoc.getDouble("hotRank"));
        idea.setTrendingRank(ideaDoc.getDouble("trendingRank"));
        idea.setLikeUsers((List<String>) ideaDoc.get("likeUsers" ));
        idea.setNumberLikes(ideaDoc.getLong("numberLikes"));
        idea.setFollowerUsers((List<String>) ideaDoc.get("followerUsers"));
        idea.setNumberFollowers(ideaDoc.getLong("numberFollowers"));
        idea.setNumberComments(ideaDoc.getLong("numberComments"));
        idea.setComments((List<IComment>) ideaDoc.get("comments"));

        List<Document> commentsDocList = (List<Document>) ideaDoc.get("comments");
        List<IComment> commentsList = new ArrayList<IComment>();
        for (Document commentDoc : commentsDocList){
            commentsList.add(buildComment(commentDoc));
        }
        idea.setComments(commentsList);

        return idea;
    }
    
    /**
     * baut ein Idea Objekt um in ein Idea Document
     * @param idea {IIdea} Idea Objekt
     * @return {IIdea} gibt Document einer Idea zurück
     */   
    private Document buildIdeaDocument(IIdea idea) {
        // ID wird nicht übertragen, da von MongoDB erzeugt!
        return new Document("name", idea.getName())
                .append("description", idea.getDescription())
                .append("catagory", idea.getCategory())
                .append("creator", buildCreatorDocument(idea.getCreator()))
                .append("publishedDate", idea.getPublishDate())
                .append("isPublished", idea.getIsPublished())
                .append("language", idea.getLanguage())
                .append("hotRank", idea.getHotRank())
                .append("trendingRank", idea.getTrendingRank())
                .append("likeUsers", idea.getLikeUsers())
                .append("numberLikes", idea.getNumberLikes())
                .append( "followerUsers", idea.getFollowerUsers())
                .append("numberFollowers", idea.getNumberFollowers())
                .append("comments", buildCommentDocumentList(idea.getComments()))
                .append("numberComments", idea.getNumberComments());
    }

    /**
     * baut ein Idea Objekt um in ein Idea Document
     * @param idea {IIdea} Idea Objekt
     * @return {IIdea} gibt Document einer Idea zurück nur wesentlich
     * Information für das Ranking
     */   
    public static Document buildSmallIdeaDocument(IIdea idea) {
        // ID wird nicht übertragen, da von MongoDB erzeugt!
        return new Document("ideaId", idea.getIdeaId())
                .append("name", idea.getName())
                .append("description", idea.getDescription())
                .append("catagory", idea.getCategory())
                .append("creator", IdeaService.buildCreatorDocument(idea.getCreator()))
                .append("publishedDate", idea.getPublishDate())
                .append("isPublished", idea.getIsPublished())
                .append("language", idea.getLanguage())
                .append("hotRank", idea.getHotRank())
                .append("trendingRank", idea.getTrendingRank())
                .append("numberLikes", idea.getNumberLikes())
                .append("numberFollowers", idea.getNumberFollowers())
                .append("numberComments", idea.getNumberComments());
    }
    
    /**
     * baut ein Idea Document um in ein Idea Objekt
     * @param ideaDoc {Document} Idea Objekt
     * @return {IIdea} gibt IIdea zurück nur wesentlich
     * Information für das Ranking
     */  
    public static IIdea buildSmallIdea(Document ideaDoc){
        IIdea idea = new Idea();

        idea.setIdeaId(ideaDoc.getString("ideaId"));
        idea.setName(ideaDoc.getString("name"));
        idea.setDescription(ideaDoc.getString("description"));
        idea.setCategory(ideaDoc.getString("catagory"));
        idea.setCreator(  buildCreator( (Document) ideaDoc.get("creator") ) );
        idea.setPublishDate(ideaDoc.getDate("publishedDate"));
        idea.setIsPublished(ideaDoc.getBoolean("isPublished"));
        idea.setLanguage(ideaDoc.getString("language"));
        idea.setHotRank(ideaDoc.getDouble("hotRank"));
        idea.setTrendingRank(ideaDoc.getDouble("trendingRank"));
        idea.setNumberLikes(ideaDoc.getLong("numberLikes"));
        idea.setNumberFollowers(ideaDoc.getLong("numberFollowers"));
        idea.setNumberComments(ideaDoc.getLong("numberComments"));

        return idea;
    }
    
    /**
     * fügt der DB ein Idee zu
     * @param idea {IIdea} Idea Objekt
     * @param userId {String} ID der Idea als String
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */ 
    public void addIdea(IIdea idea, String userId) throws Exception {
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        try {
            dbConnectionService.getCollection().insertOne(buildIdeaDocument
                    (idea));
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }
    
    /**
     * fügt der DB eine Liste von Idee zu (Testdaten)
     * @param ideaList {List<IIdea>} Liste von Idea Objekt
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */    
    public void addIdeaList(List<IIdea> ideaList) throws Exception {
        List<Document> ideaListDoc = new ArrayList<Document>();
        Document ideaDoc;
        for( IIdea idea : ideaList){
            ideaDoc = new Document();
            ideaDoc = buildIdeaDocument(idea);
            ideaListDoc.add(ideaDoc);
        }        
        
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }     
        try {
            dbConnectionService.getCollection().insertMany(ideaListDoc);
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }
    
    /**
     * Update einer Idea
     * @param idea {IIdea} Idea Objekt
     * @return {UpdateResult} Anzahl der Operation auf die DB
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */      
    public UpdateResult updateIdea(IIdea idea) throws Exception{
        Document newDoc = new Document();
        newDoc = buildIdeaDocument(idea);
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }   
        UpdateResult ur = null;
        try {
            ur = dbConnectionService.getCollection().replaceOne(
                    Filters.eq("_id", new ObjectId (idea.getIdeaId())), newDoc);
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        }       
        return ur;
    }
    
    /**
     * Löschen einer Idea
     * @param ideaId {String} ID einer Idea
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */   
    public void deleteIdea(String ideaId) throws Exception{
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        try {
            dbConnectionService.getCollection().findOneAndDelete(
                    Filters.eq("_id", new ObjectId (ideaId)));
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        }  
    }
    
    /**
     * baut ein User Objekt in ein Creator Objekt um
     * @param user {IUser} User Objekt
     * @return {ICreator} gibt ein Creator Objekt zurück
     */  
    public ICreator userToCreator(IUser user){
        ICreator creator = new Creator();
        creator.setUserId(user.getUserId());
        creator.setUserName(user.getUserName());
        creator.setEmail(user.getEmail());
        creator.setIsMailPublic(user.getIsMailPublic());
        creator.setPictureURL(user.getPictureURL());
        return creator;
    }
    
    /**
     * Updatet bestimmte Werte eines User Documents
     * @param usideaIder {IUser} ID eines User
     * @param type {IUser} Datenfeld des Users
     * @param value {IUser} Wert des Datenfeldes
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */

    /**
     * Updatet bestimmte Werte eines Idea Documents
     * @param ideaId ID der Idee
     * @param type Datenfeld der Idee
     * @param value Wert des Datenfelds
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public void updateApropertyOfaIdea(String ideaId, String type, String value) throws Exception{    
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        } 
        try {
            dbConnectionService.getCollection().updateOne(eq("_id", new ObjectId(ideaId)), 
                    new Document("$set", new Document(type, value)));
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        }  
    }
    
    /**
     * baut ein IIdea Objekt für das Ranking
     * @param idea {IIdea} Idea Objekt
     * @return {IIdea} gibt ein IIdea Objekt zurück
     */     
    public static IIdea buildIdeaToIdeaSmart( IIdea idea){
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
    
    /**
     * gint ein Idea Objekt zurück fürs Ranking
     * @param ideaId {String} ID eines User
     * @return {IIdea} gibt ein IIdea Objekt zurück
     */     
    public IIdea getIdeaSmart( String ideaId) throws Exception{
        IIdea ideaSmart = new Idea();
        ideaSmart = buildIdeaToIdeaSmart(getIdea(ideaId));    
        return ideaSmart;
    }
    
    /**
     * gibt eine Liste von Idea Objekt zurück fürs Ranking
     * @return {List<IIdea>} gibt eine Liste IIdea Objekt zurück
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */      
    public List<IIdea> getAllIdeasSmart() throws Exception{
        List<IIdea> ideasSmart = new ArrayList<IIdea>();
        List<IIdea> ideas = new ArrayList<IIdea>();
        ideas = getAllIdeas();
        for(IIdea idea : ideas){
            ideasSmart.add(buildIdeaToIdeaSmart(idea));
        }
        
        return ideasSmart; 
    }
    
    /**
     * Update die Rankings
     * @param ideaList {List<IIdea>} Liste von Ideen
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */   
    public void updateRankings(List<IIdea> ideaList) throws Exception {
      
        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            for( IIdea idea : ideaList){
                dbConnectionService.getCollection().updateOne(Filters.eq("_id", new ObjectId(idea.getIdeaId())), 
                        new Document("$set", new Document("hotRank", idea.getHotRank())));
                dbConnectionService.getCollection().updateOne(Filters.eq("_id", new ObjectId(idea.getIdeaId())), 
                        new Document("$set", new Document("trendingRank", idea.getTrendingRank())));
            }         
        } catch (Exception en) {
            throw new Exception(en);
        } finally {
            dbConnectionService.closeConnection();
        }
        
        
    }
    
}
