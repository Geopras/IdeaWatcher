package main.java.de.ideaWatcher.dataManager.services;

import com.mongodb.BasicDBObject;
import main.java.de.ideaWatcher.dataManager.pojos.Comment;
import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Stefan on 21.11.2016.
 */
public class IdeaService_Stefan {

//    public IIdea getIdea(String ideaId) throws Exception{
//        try{
//            if (!dbConnectionService.isOpen()) {
//                dbConnectionService.openConnection();
//            }
//            Document ideasDoc = dbConnectionService.getCollection()
//                    .find(new BasicDBObject("_id", new ObjectId
//                            (ideaId))).first();
//            if (ideasDoc != null) {
//                return buildIdea(ideasDoc);
//            } else {
//                throw new Exception("ideaIdNotExist");
//            }
//        } catch (Exception ex) {
//            throw new Exception(ex);
//        } finally {
//            dbConnectionService.closeConnection();
//        }
//    }


//    private Document buildCreatorDocument(ICreator creator) {
//        return new Document("userId", creator.getUserId() )
//                .append("userName", creator.getUserName())
//                .append("email", creator.getEmail())
//                .append("isMailPublic", creator.getIsMailPublic())
//                .append("pictureURL", creator.getPictureURL());
//    }

//    private ICreator buildCreator(Document creatorDoc) {
//        ICreator creator = new Creator();
//        creator.setUserId(creatorDoc.getString("userId"));
//        creator.setUserName(creatorDoc.getString("userName"));
//        creator.setEmail(creatorDoc.getString("email"));
//        creator.setIsMailPublic(creatorDoc.getBoolean("isMailPublic"));
//        creator.setPictureURL(creatorDoc.getString("pictureUrl"));
//        return creator;
//    }

//    private Document buildCommentDocument(IComment comment) {
//        return new Document("commentId", comment.getCommentId() )
//                .append("userName", comment.getUserName())
//                .append("userId", comment.getUserId())
//                .append("text", comment.getText())
//                .append("pictureURL", comment.getPictureURL())
//                .append("publishDate", comment.getPublishDate());
//    }
//
//    private IComment buildComment(Document commentDoc) {
//        IComment comment = new Comment();
//        comment.setCommentId(commentDoc.getString("commentId"));
//        comment.setUserId(commentDoc.getString("userId"));
//        comment.setUserName(commentDoc.getString("userName"));
//        comment.setText(commentDoc.getString("text"));
//        comment.setPublishDate(commentDoc.getDate("publishDate"));
//        comment.setPictureURL(commentDoc.getString("pictureUrl"));
//        return comment;
//    }
//
//    private List<Document> buildCommentDocumentList(List<IComment> commentList){
//
//        List<Document> commentDocList = new ArrayList<Document>();
//
//        for (IComment comment : commentList){
//            commentDocList.add(buildCommentDocument(comment));
//        }
//        return commentDocList;
//    }
//
//    private List<IComment> buildCommentList(List<Document>  commentDocList){
//
//        List<IComment> commentList = new ArrayList<IComment>();
//
//        for (Document document : commentDocList){
//            commentList.add(buildComment(document));
//        }
//
//        return commentList;
//    }

}








//package main.java.de.ideaWatcher.dataManager.services;
//
//        import com.mongodb.client.model.Filters;
//        import com.mongodb.client.result.UpdateResult;
//        import main.java.de.ideaWatcher.dataManager.pojos.Comment;
//        import main.java.de.ideaWatcher.dataManager.pojos.Creator;
//        import main.java.de.ideaWatcher.dataManager.pojos.Idea;
//        import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
//        import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
//        import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
//        import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
//        import org.bson.Document;
//
//        import java.util.ArrayList;
//        import java.util.List;
//
//        import static com.mongodb.client.model.Filters.eq;
//
///**
// * Service fuer Zugriff auf Datenbank
// */
//public class IdeaService {
//
//    private DbConnectionService dbConnectionService;
//
//    public IdeaService(String collectionName) {
//        this.dbConnectionService = new DbConnectionService(collectionName);
//    }
//
//    private Document buildCreatorDocument(ICreator creator) {
//        return new Document("userId", creator.getUserId() )
//                .append("userName", creator.getUserName())
//                .append("email", creator.getEmail())
//                .append("isMailPublic", creator.getIsMailPublic())
//                .append("pictureURL", creator.getPictureURL());
//    }
//
//    private ICreator buildCreator(Document creatorDoc) {
//        ICreator creator = new Creator();
//        creator.setUserId(creatorDoc.getString("userId"));
//        creator.setUserName(creatorDoc.getString("userName"));
//        creator.setEmail(creatorDoc.getString("email"));
//        creator.setIsMailPublic(creatorDoc.getBoolean("isMailPublic"));
//        creator.setPictureURL(creatorDoc.getString("pictureUrl"));
//        return creator;
//    }
//
//
//    private Document buildCommentDocument(IComment comment) {
//        return new Document("commentId", comment.getCommentId() )
//                .append("userName", comment.getUserName())
//                .append("userId", comment.getUserId())
//                .append("text", comment.getText())
//                .append("pictureURL", comment.getPictureURL())
//                .append("publishDate", comment.getPublishDate());
//    }
//
//    private IComment buildComment(Document commentDoc) {
//        IComment comment = new Comment();
//        comment.setCommentId(commentDoc.getString("commentId"));
//        comment.setUserId(commentDoc.getString("userId"));
//        comment.setUserName(commentDoc.getString("userName"));
//        comment.setText(commentDoc.getString("text"));
//        comment.setPublishDate(commentDoc.getDate("publishDate"));
//        comment.setPictureURL(commentDoc.getString("pictureUrl"));
//        return comment;
//    }
//
//    private List<Document> buildCommentDocumentList(List<IComment> commentList){
//
//        List<Document> commentDocList = new ArrayList<Document>();
//
//        for (IComment comment : commentList){
//            commentDocList.add(buildCommentDocument(comment));
//        }
//        return commentDocList;
//    }
//
//    private List<IComment> buildCommentList(List<Document>  commentDocList){
//
//        List<IComment> commentList = new ArrayList<IComment>();
//
//        for (Document document : commentDocList){
//            commentList.add(buildComment(document));
//        }
//
//        return commentList;
//    }
//
//    public IIdea getIdea( String ideaId ) throws Exception {
//        if (!dbConnectionService.isOpen()) {
//            dbConnectionService.openConnection();
//        }
//        Document foundDoc = dbConnectionService.getCollection().find(eq("_id", ideaId)).first();
//
//        return buildIdea(foundDoc);
//    }
//
//    public List<IIdea> getAllIdeas() throws Exception {
//        // ToDo
//        // fehlende Fehlerbehandlungen sollten noch hinzugef�gt werden
//        if (!dbConnectionService.isOpen()) {
//            dbConnectionService.openConnection();
//        }
//        List<Document> ideasDoc = dbConnectionService.getCollection().find().into(new ArrayList<Document>());
//        dbConnectionService.closeConnection();
//        List<IIdea> ideas = new ArrayList<IIdea>();
//        for(Document d : ideasDoc){
//            ideas.add(buildIdea(d));
//        }
//        return ideas;
//    }
//
//    private IIdea buildIdea( Document ideaDoc){
//        IIdea idea = new Idea();
//
//        idea.setIdeaId(ideaDoc.getObjectId("_id").toString());
//        idea.setName(ideaDoc.getString("name"));
//        idea.setDescription(ideaDoc.getString("description"));
//        idea.setCategory(ideaDoc.getString("catagory"));
//        idea.setCreator(  buildCreator( (Document) ideaDoc.get("creator") ) );
//        idea.setPublishDate(ideaDoc.getDate("publishedDate"));
//        idea.setLanguage(ideaDoc.getString("language"));
//        idea.setHotRank(ideaDoc.getDouble("hotRank"));
//        idea.setTrendingRank(ideaDoc.getDouble("trendingRank"));
//        idea.setLikeUsers((List<String>) ideaDoc.get("likeUsers" ));
//        idea.setNumberLikes(ideaDoc.getLong("numberLikes"));
//        idea.setFollowerUsers((List<String>) ideaDoc.get("followerUsers"));
//        idea.setNumberFollowers(ideaDoc.getLong("numberFollowers"));
//        idea.setComments((List<IComment>) ideaDoc.get("comments"));
//        idea.setNumberComments(ideaDoc.getLong("numberComments"));
//
//        return idea;
//    }
//
//    private Document buildIdeaDocument(IIdea idea) {
//        // ID wird nicht übertragen, da von MongoDB erzeugt!
//        return new Document("name", idea.getName())
//                .append("description", idea.getDescription())
//                .append("catagory", idea.getCategory())
//                .append("creator", buildCreatorDocument(idea.getCreator()))
//                .append("publishedDate", idea.getPublishDate())
//                .append("language", idea.getLanguage())
//                .append("hotRank", idea.getHotRank())
//                .append("trendingRank", idea.getTrendingRank())
//                .append("likeUsers", idea.getLikeUsers())
//                .append("numberLikes", idea.getNumberLikes())
//                .append( "followerUsers", idea.getFollowerUsers())
//                .append("numberFollowers", idea.getNumberFollowers())
//                //.append("comments", idea.getComments())
//                .append("comments", buildCommentDocumentList(idea.getComments()))
//                .append("numberComments", idea.getNumberComments());
//    }
//
//    public void addIdea(IIdea idea, String userId) throws Exception {
//        if (!dbConnectionService.isOpen()) {
//            dbConnectionService.openConnection();
//        }
//        dbConnectionService.getCollection().insertOne(buildIdeaDocument
//                (idea));
//        dbConnectionService.closeConnection();
//    }
//
//    public void addIdeaList(List<IIdea> ideaList) throws Exception {
//        List<Document> ideaListDoc = new ArrayList<Document>();
//        Document ideaDoc;
//        for( IIdea idea : ideaList){
//            //ideaListDoc.add(buildIdeaDocument(idea));
//            ideaDoc = new Document();
//            ideaDoc = buildIdeaDocument(idea);
//            ideaListDoc.add(ideaDoc);
//        }
//
//        if (!dbConnectionService.isOpen()) {
//            dbConnectionService.openConnection();
//        }
//        dbConnectionService.getCollection().insertMany(ideaListDoc);
//        dbConnectionService.closeConnection();
//    }
//
//    public UpdateResult updateIdea(IIdea idea){
//        Document newDoc = new Document();
//        newDoc = buildIdeaDocument(idea);
//        UpdateResult ur = dbConnectionService.getCollection().replaceOne(Filters.eq("_id", newDoc.get("_id")), newDoc);
//        return ur;
//    }
//
//    public void deleteUser(String ideaId){
//        dbConnectionService.getCollection().findOneAndDelete(Filters.eq("_id", ideaId));
//    }
//
//    public ICreator userToCreator(IUser user){
//        ICreator creator = new Creator();
//        creator.setUserId(user.getUserId());
//        creator.setUserName(user.getUserName());
//        creator.setEmail(user.getEmail());
//        creator.setIsMailPublic(user.getIsMailPublic());
//        creator.setPictureURL(user.getPictureURL());
//        return creator;
//    }
//
//}
