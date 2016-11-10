package main.java.de.ideaWatcher.dataManager.model;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import java.util.ArrayList;
import java.util.List;

/**
 * Model zur Definition eines User-Objekts
 */
public class User implements IUser {

    private String userName;
    private Long userId;
    private String password;
    private String email;
    private boolean isMailPublic;
    private String surname;
    private String firstName;
    private String gender;
    private String language;
    private String pictureUrl;
    private List<IIdea> createdIdeas;
    private int numberCreatedIdeas;
    private List<IIdea> followedIdeas;
    private int numberFollowedIdeas;

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
    public List<IIdea> getCreatedIdeas() {
        return this.createdIdeas;
    }

    @Override
    public void setCreatedIdeas(List<IIdea> createdIdeas) {
        this.createdIdeas = createdIdeas;
    }

    @Override
    public int getNumberCreatedIdeas() {
        return this.numberCreatedIdeas;
    }

    @Override
    public void setNumberCreatedIdeas(int numberCreatedIdeas) {
        this.numberCreatedIdeas = numberCreatedIdeas;
    }

    @Override
    public List<IIdea> getFollowedIdeas() {
        return this.followedIdeas;
    }

    @Override
    public void setFollowedIdeas(List<IIdea> followedIdeas) {
        this.followedIdeas = followedIdeas;
    }

    @Override
    public int getNumberFollowedIdeas() {
        return this.numberFollowedIdeas;
    }

    @Override
    public void setNumberFollowedIdeas(int numberFollowedIdeas) {
        this.numberFollowedIdeas = numberFollowedIdeas;
    }

    /**
     * Gibt eine leere Instanz der User-Klasse zurueck
     * @return {User} user object
     */
    public User() {
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
