package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import java.util.ArrayList;
import java.util.List;

/**
 * POJO fuer Austausch eines User-Objekts
 */
public class User implements IUser {

    private String userId;
    private String userName;
    private String password;
    private String email;
    private boolean isMailPublic;
    private String surname;
    private String firstName;
    private String gender;
    private String language;
    private String pictureUrl;
    private List<String> createdIdeas;
    private long numberCreatedIdeas;
    private List<String> followedIdeas;
    private long numberFollowedIdeas;

    @Override
    public String getUserId() {
        return this.userId;
    }

    @Override
    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String getUserName() {
        return this.userName;
    }

    @Override
    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getEmail() {
        return this.email;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean getIsMailPublic() {
        return this.isMailPublic;
    }

    @Override
    public void setIsMailPublic(boolean isMailPublic) {
        this.isMailPublic = isMailPublic;
    }

    @Override
    public String getSurname() {
        return this.surname;
    }

    @Override
    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Override
    public String getFirstname() {
        return this.firstName;
    }

    @Override
    public void setFirstname(String firstname) {
        this.firstName = firstname;
    }

    @Override
    public String getGender() {
        return this.gender;
    }

    @Override
    public void setGender(String gender) {
        this.gender = gender;
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
    public String getPictureURL() {
        return this.pictureUrl;
    }

    @Override
    public void setPictureURL(String pictureURL) {
        this.pictureUrl = pictureURL;
    }

    @Override
    public List<String> getCreatedIdeas() {
        return this.createdIdeas;
    }

    @Override
    public void setCreatedIdeas(List<String> createdIdeas) {
        this.createdIdeas = createdIdeas;
    }

    @Override
    public long getNumberCreatedIdeas() {
        return this.numberCreatedIdeas;
    }

    @Override
    public void setNumberCreatedIdeas(long numberCreatedIdeas) {
        this.numberCreatedIdeas = numberCreatedIdeas;
    }

    @Override
    public List<String> getFollowedIdeas() {
        return this.followedIdeas;
    }

    @Override
    public void setFollowedIdeas(List<String> followedIdeas) {
        this.followedIdeas = followedIdeas;
    }

    @Override
    public long getNumberFollowedIdeas() {
        return this.numberFollowedIdeas;
    }

    @Override
    public void setNumberFollowedIdeas(long numberFollowedIdeas) {
        this.numberFollowedIdeas = numberFollowedIdeas;
    }

    /**
     * Gibt eine leere Instanz der User-Klasse zurueck
     * @return {User} user object
     */
    public User() {
        this.userId = "";
        this.userName = "";
        this.password = "";
        this.firstName = "";
        this.surname = "";
        this.email = "";
        this.gender = "";
        this.language = "";
        this.pictureUrl = "";
        this.createdIdeas = new ArrayList<>();
        this.numberCreatedIdeas = 0;
        this.numberFollowedIdeas = 0;
        this.followedIdeas = new ArrayList<>();
    }
}
