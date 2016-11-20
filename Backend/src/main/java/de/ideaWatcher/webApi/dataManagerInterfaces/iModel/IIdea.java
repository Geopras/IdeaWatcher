package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel;

import org.json.JSONObject;

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
    Double getHotRank();
    void setHotRank(double hotRank);
    Double getTrendingRank();
    void setTrendingRank(double trendingRank);
    Double getFreshRank();
    void setFreshRank(Double double1);
    /**
     * Gibt eine Liste von Usern zurueck, die die Idee geliked haben
     * @return {List<IUser>} Liste von Usern
     */
    List<String> getLikeUsers();
    void setLikeUsers(List<String> list);
    Long getNumberLikes();
    void setNumberLikes(Long numberLikes);
    List<String> getFollowerUsers();
    void setFollowerUsers(List<String> followerUsers);
    Long getNumberFollowers();
    void setNumberFollowers(Long numberFollowers);
    List<String> getComments();
    void setComments(List<String> comments);
    Long getNumberComments();
    void setNumberComments(Long numberComments);
    String getIdeaId();
    void setIdeaId(String ideaId);

    JSONObject toJSONObject();
    
}
