package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;

/**
 * Klasse für Creator-Objekt
 */
public class Creator implements ICreator {
    @Override
    public String getUserId() {
        return null;
    }

    @Override
    public void setUserId(String userId) {

    }

    @Override
    public String getUserName() {
        return null;
    }

    @Override
    public void setUserName(String userName) {

    }

    @Override
    public String getEmail() {
        return null;
    }

    @Override
    public void setEmail(String email) {

    }

    @Override
    public boolean getIsMailPublic() {
        return false;
    }

    @Override
    public void setIsMailPublic(boolean isMailPublic) {

    }

    @Override
    public String getPictureURL() {
        return null;
    }

    @Override
    public void setPictureURL(String pictureURL) {

    }
}
