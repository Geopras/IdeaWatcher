package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;

/**
 * Klasse für Creator-Objekt
 */
public class Creator implements ICreator {
    
    private String userId;
    private String userName;
    private String email;
    private boolean isMailPublic;
    private String pictureURL;
    
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
    public String getPictureURL() {
        return this.pictureURL;
    }

    @Override
    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }
}
