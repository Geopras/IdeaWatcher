package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel;


import org.json.JSONObject;

import java.util.Date;

public interface IComment {

    String getText();
    void setText(String text);
    IUser getCreator();
    void setCreator(IUser creator);
    Date getPublishDate();
    void setPublishDate(Date publishDate);

    JSONObject toJSONObject();
}
