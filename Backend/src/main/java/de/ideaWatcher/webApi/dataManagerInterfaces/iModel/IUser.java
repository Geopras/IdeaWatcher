package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel;

import java.util.List;

/**
 * Interface zur Erstellung der POJO-Klasse User
 */
public interface IUser {

    /**
     * Gibt den Benutzernamen zurueck
     * @return {String} user name
     */
    String getUserName();

    /**
     * Legt den Benutzernamen fest
     * @param name {String} Benutzername
     */
    void setUserName(String name);

    /**
     * Gibt das Passwort als Hash-Wert zurueck
     * @return {String} Passwort im Hash-Format
     */
    String getPassword();

    /**
     * Legt das Passwort als Hash-Wert fest
     * @param password
     */
    void setPassword(String password);

    String getEmail();
    void setEmail(String email);
    boolean getIsMailPublic();
    void setIsMailPublic(boolean isMailPublic);
    String getSurname();
    void setSurname(String surname);
    String getFirstname();
    void setFirstname(String firstname);
    String getGender();
    void setGender(String gender);
    String getLanguage();
    void setLanguage(String language);
    String getPictureURL();
    void setPictureURL(String pictureURL);
    List<IIdea> getCreatedIdeas();
    void setCreatedIdeas(List<IIdea> createdIdeas);
    int getNumberCreatedIdeas();
    void setNumberCreatedIdeas(int p_numberCreated);
    List<IIdea> getFollowedIdeas();
    void setFollowedIdeas(List<IIdea> followedIdeas);
    int getNumberFollowedIdeas();
    void setNumberFollowedIdeas(int numberFollowedIdeas);
}
