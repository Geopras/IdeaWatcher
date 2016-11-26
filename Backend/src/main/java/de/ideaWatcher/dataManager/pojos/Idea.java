package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * POJO fuer Austausch eines Idee-Objekts
 */
public class Idea implements IIdea {
    
    private String ideaId;
    private String name;
    private String description;
    private String category;
    private ICreator creator;
    private Date publishDate;
    private boolean isPublished;
    private String language;
    private Double hotRank;
    private Double trendingRank;
    private List<String> likeUsers;
    private List<String> followerUsers;
    private Long numberLikes;
    private Long numberFollowers;
    private List<IComment> comments;
    private Long numberComments;
    

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getDescription() {
        return this.description;
    }

    @Override
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String getCategory() {
        return this.category;
    }

    @Override
    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public ICreator getCreator() {
        return this.creator;
    }

    @Override
    public void setCreator(ICreator creator) {
        this.creator = creator;
    }

    @Override
    public Date getPublishDate() {
        return this.publishDate;
    }

    @Override
    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    @Override
    public boolean getIsPublished() {
        return this.isPublished;
    }

    @Override
    public void setIsPublished(boolean isPublished) {
        this.isPublished = isPublished;
    }

    @Override
    public String getLanguage() {
        return this.language;
    }

    @Override
    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public Double getHotRank() {
        return this.hotRank;
    }

    @Override
    public void setHotRank(double hotRank) {
        this.hotRank = hotRank;
    }

    @Override
    public Double getTrendingRank() {
        return this.trendingRank;
    }

    @Override
    public void setTrendingRank(double trendingRank) {
        this.trendingRank = trendingRank;
    }

    @Override
    public List<String> getLikeUsers() {
        return this.likeUsers;
    }

    @Override
    public void setLikeUsers(List<String> likeUsers) {
        this.likeUsers = likeUsers;
    }

    @Override
    public Long getNumberLikes() {
        return this.numberLikes;
    }

    @Override
    public void setNumberLikes(Long numberLikes) {
        this.numberLikes = numberLikes;
    }

    @Override
    public List<String> getFollowerUsers() {
        return this.followerUsers;
    }

    @Override
    public void setFollowerUsers(List<String> followerUsers) {
        this.followerUsers = followerUsers;
    }

    @Override
    public Long getNumberFollowers() {
        return this.numberFollowers;
    }

    @Override
    public void setNumberFollowers(Long numberFollowers) {
        this.numberFollowers = numberFollowers;
    }

    @Override
    public List<IComment> getComments() {
        return this.comments;
    }

    @Override
    public void setComments(List<IComment> comments) {
        this.comments = comments;
    }

    @Override
    public Long getNumberComments() {
        return this.numberComments;
    }

    @Override
    public void setNumberComments(Long numberComments) {
        this.numberComments = numberComments;
    }
    
    @Override
    public String getIdeaId() {
        return ideaId;
    }
    
    @Override
    public void setIdeaId( String ideaId) {
       this.ideaId = ideaId;
    }

    /**
     * Gibt eine leere Instanz der Idea-Klasse zurueck
     * @return {Idea} idea object
     */
    public Idea() {
        this.ideaId = "";
        this.name = "";
        this.description = "";
        this.category = "";
        this.creator = new Creator();
        this.publishDate = new Date();
        this.language = "";
        this.hotRank = new Double(0.0);
        this.trendingRank = new Double(0.0);
        this.likeUsers = new ArrayList<>();
        this.numberLikes = new Long(0);
        this.followerUsers = new ArrayList<>();
        this.numberFollowers = new Long(0);
        this.comments = new ArrayList<>();
        this.numberComments = new Long(0);
    }
}
