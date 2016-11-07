package de.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs;

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
     * Gibt die User ID zurueck
     * @return {Long} user id
     */
    Long getUserId();

    /**
     * Legt die User ID fest
     * @param userId {Long}
     */
    void setUserId(Long userId);

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
    String getCountry();
    void setCountry(String country);
    String getPictureURL();
    void setPictureURL(String pictureURL);
    IIdea getCreatedIdea();
    void setCreatedIdeas(IIdea createdIdeas);
    int getNumberCreatedIdeas();
    void setNumberCreatedIdeas(int p_numberCreated);
    List<IIdea> getFollowedIdeas();
    void setFollowedIdeas(List<IIdea> followedIdeas);
    int getP_numberFollowed() {
        return p_numberFollowed;
    }
    public void setP_numberFollowed(int p_numberFollowed) {
        this.p_numberFollowed = p_numberFollowed;
    }
    public String getP_password() {
        return p_password;
    }
    public void setP_password(String p_password) {
        this.p_password = p_password;
    }
}
