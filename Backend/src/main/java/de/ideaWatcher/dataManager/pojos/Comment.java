package main.java.de.ideaWatcher.dataManager.pojos;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.json.JSONObject;

import java.util.Date;

public class Comment implements IComment {

    private String commentId;
    private String text;
    private IUser creator;
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
    public IUser getCreator() {
        return this.creator;
    }

    @Override
    public void setCreator(IUser creator) {
        this.creator = creator;
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
