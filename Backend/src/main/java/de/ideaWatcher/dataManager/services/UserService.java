package main.java.de.ideaWatcher.dataManager.services;

import main.java.de.ideaWatcher.dataManager.BCrypt;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs.IUser;
import org.bson.Document;
import static com.mongodb.client.model.Filters.eq;

/**
 * Klasse fuer Zugriff auf User-Datenbank
 */
public class UserService {

    private DBconnectionService dbConnectionService;

    public UserService() {
        this.dbConnectionService = new DBconnectionService("UserCollection");
    }

    public IUser getUser(String userName) {

        dbConnectionService.openConnection();

        Document userDoc = dbConnectionService.getCollection().find(eq
                ("userName", userName)).first();
        dbConnectionService.closeConnection();

        return buildUser(userDoc);
    }

    private IUser buildUser(Document userDoc) {

        IUser user = new User();
        user.setUserName(userDoc.getString("userName").toString());
        return user;
    }

    public boolean existsUser(String userName) throws Exception {

        dbConnectionService.openConnection();

        try {
            Document userDoc = dbConnectionService.getCollection().find(eq
                    ("userName", userName)).first();
            dbConnectionService.closeConnection();
            if (userDoc == null) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    public boolean existsEmail(String email) throws Exception {

        dbConnectionService.openConnection();

        try {
            Document userDoc = dbConnectionService.getCollection().find(eq
                    ("email", email)).first();
            dbConnectionService.closeConnection();
            if (userDoc == null) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    public void addUser(IUser user) throws Exception {
        // hash aus Passwort berechnen
        if (existsUser(user.getUserName()) && !existsEmail(user.getEmail())){
            throw new Exception("addUser/userOrEmailExists");
        }

        user.setPassword(hashPassword(user.getPassword()));
        try {
            dbConnectionService.getCollection().insertOne(buildUserDocument
                    (user));
            dbConnectionService.closeConnection();
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    private String hashPassword(String password) {

        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private Document buildUserDocument(IUser user) {

        //TODO: Documents für createdIdeas und followedIdeas erzeugen
        int sizeCreatedIdeas = user.getCreatedIdeas().size();

        if (user.getCreatedIdeas() != null && user.getCreatedIdeas().size() > 0) {
            Document createdIdeas = new Document();
            for (int i = 0; i < user.getCreatedIdeas().size(); i++) {

            }
        }

        return new Document("username", user.getUserName() )
                .append("password", user.getPassword())
                .append("email", user.getEmail())
                .append("isMailPublic", user.getIsMailPublic())
                .append("surname", user.getSurname())
                .append("firstName", user.getFirstname())
                .append("gender", user.getGender())
                .append("language", user.getLanguage())
                .append("pictureURL", user.getPictureURL())
                .append( "createdIdeas", null)
                .append("numberCreatedIdeas", user.getNumberCreatedIdeas())
                .append( "followedIdeas", null)
                .append("numberFollowed", user.getNumberFollowedIdeas());
    }

    public boolean isCorrectPassword(String plaintextPassword, String
            hashedPassword) {

        if (BCrypt.checkpw(plaintextPassword, hashedPassword)) {
            return true;
        } else {
            return false;
        }
    }
}
