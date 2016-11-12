package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * POJO fuer Austausch eines Idee-Objekts
 */
public class Idea implements IIdea {

    private String name;
    private String description;
    private String category;
    private IUser creator;
    private Date publishDate;
    private String language;
    private Long hotRank;
    private Long freshRank;
    private Long trendingRank;
    private List<IUser> likeUsers;
    private List<IUser> followerUsers;
    private Long numberLikes;
    private Long numberFollowers;
    private List<String> comments;
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
    public IUser getCreator() {
        return this.creator;
    }

    @Override
    public void setCreator(IUser creator) {
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
    public String getLanguage() {
        return this.language;
    }

    @Override
    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public Long getHotRank() {
        return this.hotRank;
    }

    @Override
    public void setHotRank(Long hotRank) {
        this.hotRank = hotRank;
    }

    @Override
    public Long getFreshRank() {
        return this.freshRank;
    }

    @Override
    public void setFreshRank(Long freshRank) {
        this.freshRank = freshRank;
    }

    @Override
    public Long getTrendingRank() {
        return this.trendingRank;
    }

    @Override
    public void setTrendingRank(Long trendingRank) {
        this.trendingRank = trendingRank;
    }

    @Override
    public List<IUser> getLikeUsers() {
        return this.likeUsers;
    }

    @Override
    public void setLikeUsers(List<IUser> likeUsers) {
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
    public List<IUser> getFollowerUsers() {
        return this.followerUsers;
    }

    @Override
    public void setFollowerUsers(List<IUser> followerUsers) {
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
    public List<String> getComments() {
        return this.comments;
    }

    @Override
    public void setComments(List<String> comments) {
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

    /**
     * Gibt eine leere Instanz der Idea-Klasse zurueck
     * @return {Idea} idea object
     */
    public Idea() {
        this.name = "";
        this.description = "";
        this.category = "";
        this.creator = new User();
        this.publishDate = new Date();
        this.language = "";
        this.hotRank = new Long(0);
        this.freshRank = new Long(0);
        this.trendingRank = new Long(0);
        this.likeUsers = new ArrayList<>();
        this.numberLikes = new Long(0);
        this.followerUsers = new ArrayList<>();
        this.numberFollowers = new Long(0);
        this.comments = new ArrayList<>();
        this.numberComments = new Long(0);
    }
}
