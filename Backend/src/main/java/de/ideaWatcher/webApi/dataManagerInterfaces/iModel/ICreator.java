package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel;

/**
 * Interface für Creator-Objekt
 */
public interface ICreator {

    String getUserId();
    void setUserId(String userId);

    String getUserName();
    void setUserName(String userName);

    String getEmail();
    void setEmail(String email);

    boolean getIsMailPublic();
    void setIsMailPublic(boolean isMailPublic);

    String getPictureURL();
    void setPictureURL(String pictureURL);
}
