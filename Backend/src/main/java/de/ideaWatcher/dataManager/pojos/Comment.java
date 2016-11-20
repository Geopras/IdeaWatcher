package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.json.JSONObject;

import java.util.Date;

public class Comment implements IComment {

    private String commentId;
    private String text;
    private String userId;
    private String userName;
    private String pictureURL;
    private Date publishDate;

    @Override
    public String getCommentId() {
        return this.commentId;
    }

    @Override
    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public void setText(String text) {
        this.text = text;
    }

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
    public String getPictureURL() {
        return this.pictureURL;
    }

    @Override
    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }

    @Override
    public Date getPublishDate() {
        return this.publishDate;
    }

    @Override
    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

}
