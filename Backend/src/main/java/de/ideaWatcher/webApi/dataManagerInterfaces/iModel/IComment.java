package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel;


import org.json.JSONObject;

import java.util.Date;

public interface IComment {

    String getCommentId();
    void setCommentId(String commentId);
    String getText();
    void setText(String text);
    String getUserId();
    void setUserId(String userId);
    String getUserName();
    void setUserName(String userName);
    String getPictureURL();
    void setPictureURL(String pictureURL);
    Date getPublishDate();
    void setPublishDate(Date publishDate);
}
