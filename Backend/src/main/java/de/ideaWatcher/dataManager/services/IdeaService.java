package main.java.de.ideaWatcher.dataManager.services;

import java.util.ArrayList;
import java.util.List;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import org.bson.Document;
import main.java.de.ideaWatcher.dataManager.pojos.Idea;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

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
    
    public List<IIdea> getAllIdeasSmart (){
        // ToDo
        List<IIdea> ideaList = new ArrayList<IIdea>();
        return ideaList;
    }
    
    private IIdea buildIdea( Document ideaDoc){
        IIdea idea = new Idea();
        
        idea.setIdeaID(ideaDoc.getObjectId("_id").toString());
        idea.setName(ideaDoc.getString("name"));
        idea.setDescription(ideaDoc.getString("description"));
        idea.setCategory(ideaDoc.getString("catagory"));
        idea.setCreator(ideaDoc.get("creator", User.class));
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
        List<Document> ideaListDoc = new ArrayList<>();
        for( IIdea idea : ideaList){
            ideaListDoc.add(buildIdeaDocument(idea));
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
            .append("creator", idea.getCreator())
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
}
