package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel;

import java.util.Date;
import java.util.List;

/**
 * Interface zur Implementierung einer Idea-Klasse
 */
public interface IIdea {

    String getName();
    void setName(String name);
    String getDescription();
    void setDescription(String description);
    String getCategory();
    void setCategory(String category);
    IUser getCreator();
    void setCreator(IUser creator);
    Date getPublishDate();
    void setPublishDate(Date publishDate);
    String getLanguage();
    void setLanguage(String language);
    Long getHotRank();
    void setHotRank(Long hotRank);
    Long getFreshRank();
    void setFreshRank(Long freshRank);
    Long getTrendingRank();
    void setTrendingRank(Long trendingRank);
    /**
     * Gibt eine Liste von Usern zurueck, die die Idee geliked haben
     * @return {List<IUser>} Liste von Usern
     */
    List<IUser> getLikeUsers();
    void setLikeUsers(List<IUser> likeUsers);
    Long getNumberLikes();
    void setNumberLikes(Long numberLikes);
    List<IUser> getFollowerUsers();
    void setFollowerUsers(List<IUser> followerUsers);
    Long getNumberFollowers();
    void setNumberFollowers(Long numberFollowers);
    List<String> getComments();
    void setComments(List<String> comments);
    Long getNumberComments();
    void setNumberComments(Long numberComments);
}