package main.java.de.ideaWatcher.webApi.core;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IComment;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Erstellt aus den POJOs die noetigen JSON-Objekte fuer das Frontend
 */
public class JSONBuilder {

    public static JSONObject getCommentJSONObject(IComment comment) {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("commentId", comment.getCommentId());
        jsonObject.put("text", comment.getText());
        jsonObject.put("publishDate", comment.getPublishDate());
        jsonObject.put("userId", comment.getUserId());
        jsonObject.put("userName", comment.getUserName());
        jsonObject.put("pictureURL", comment.getPictureURL());

        return jsonObject;
    }

    public static JSONObject getIdeaListJSONObject(IIdea idea) {

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("ideaId", idea.getIdeaId());
        jsonObject.put("name", idea.getName());
        jsonObject.put("description", idea.getDescription());
        jsonObject.put("category", idea.getCategory());
        jsonObject.put("publishDate", idea.getPublishDate().getTime());
        jsonObject.put("language", idea.getLanguage());
        jsonObject.put("hotRank", idea.getHotRank());
        jsonObject.put("trendingRank", idea.getTrendingRank());
        jsonObject.put("numberLikes", idea.getNumberLikes());
        jsonObject.put("numberFollowers", idea.getNumberFollowers());
        jsonObject.put("numberComments", idea.getNumberComments());

        jsonObject.put("creator", JSONBuilder.getCreatorJSONObject(idea.getCreator()));
        jsonObject.put("likeUsers", new JSONArray(idea.getLikeUsers()));
        jsonObject.put("followers", new JSONArray(idea.getFollowerUsers()));

        return jsonObject;
    }

    public static JSONObject getIdeaDetailsJSONObject(IIdea idea){

        JSONObject jsonObject = getIdeaListJSONObject(idea);

        JSONArray commentsArray = new JSONArray();
        for (IComment comment : idea.getComments()){
            commentsArray.put(JSONBuilder.getCommentJSONObject(comment));
        }
        jsonObject.put("comments", commentsArray);

        return jsonObject;
    }


    public static JSONObject getCreatorJSONObject(ICreator creator) {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("userId", creator.getUserId());
        jsonObject.put("userName", creator.getUserName());
        jsonObject.put("email", creator.getEmail());
        jsonObject.put("isMailPublic", creator.getIsMailPublic());

        return jsonObject;
    }

    public static JSONObject getFullUserJSONObject(IUser user) {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("userID", user.getUserId());
        jsonObject.put("userName", user.getUserName());
        jsonObject.put("email", user.getEmail());
        jsonObject.put("isMailPublic", user.getIsMailPublic());
        jsonObject.put("surname", user.getSurname());
        jsonObject.put("firstName", user.getFirstname());
        jsonObject.put("gender", user.getGender());
        jsonObject.put("language", user.getLanguage());

        return jsonObject;
    }

}
