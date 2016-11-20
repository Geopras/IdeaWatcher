package main.java.de.ideaWatcher.dataManager.services;

import com.mongodb.BasicDBObject;
import main.java.de.ideaWatcher.dataManager.BCrypt;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;

/**
 * Klasse fuer Zugriff auf User-Datenbank
 */
public class UserService {

    private DbConnectionService dbConnectionService;

    public UserService(String serverName, String collectionName) {
        this.dbConnectionService = new DbConnectionService(serverName, collectionName);
    }

    /**
     * Gibt den User anhand seiner UserID aus der DB zurück
     * @param userId {String} eindeutige UserID
     * @return {IUser} User-Objekt
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public IUser getUser(String userId) throws Exception {

        try {
            if (this.existsUserId(userId)) {
                if (!dbConnectionService.isOpen()) {
                    dbConnectionService.openConnection();
                }
                Document userDoc = dbConnectionService.getCollection()
                        .find(new BasicDBObject("_id", new ObjectId
                                (userId))).first();
                return buildUser(userDoc);
            } else {
                throw new Exception("userIdNotExist");
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }

    /**
     * Gibt die UserID zu einem Usernamen oder einer Email zurück
     * @param userNameOrEmail {String} Username oder Email
     * @return {String} von der DB generierte UserID
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public String getUserId(String userNameOrEmail) throws Exception{

        try {
            Document userDoc;
            if (this.existsUserName(userNameOrEmail)) {
                if (!dbConnectionService.isOpen()) {
                    dbConnectionService.openConnection();
                }
                userDoc = dbConnectionService.getCollection()
                        .find(new BasicDBObject("userName", userNameOrEmail))
                        .first();
                System.out.println("ID: " + userDoc.get("_id").toString());
                return userDoc.get("_id").toString();
            }
            else if (this.existsEmail(userNameOrEmail)) {
                if (!dbConnectionService.isOpen()) {
                    dbConnectionService.openConnection();
                }
                userDoc = dbConnectionService.getCollection()
                        .find(new BasicDBObject("email", userNameOrEmail))
                        .first();
                return userDoc.get("_id").toString();
            } else {
                throw new Exception("getUserId_userNameOrEmailNotExists");
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }

    private IUser buildUser(Document userDoc) {

        IUser user = new User();
        user.setUserId(userDoc.getObjectId("_id").toString());
        user.setUserName(userDoc.getString("userName"));
        user.setPassword(userDoc.getString("password"));
        user.setEmail(userDoc.getString("email"));
        user.setIsMailPublic(userDoc.getBoolean("isMailPublic"));
        user.setSurname(userDoc.getString("surname"));
        user.setFirstname(userDoc.getString("firstName"));
        user.setGender(userDoc.getString("gender"));
        user.setLanguage(userDoc.getString("language"));
        user.setPictureURL(userDoc.getString("pictureUrl"));
        user.setNumberCreatedIdeas(userDoc.getDouble("numberCreatedIdeas"));
        user.setNumberFollowedIdeas(userDoc.getDouble("numberFollowedIdeas"));
        return user;
    }

    /**
     * Prüft, ob die UserID bereits in der DB vorhanden ist
     * @param userId {String} eindeutige UserID
     * @return {boolean} TRUE oder FALSE je nachdem, ob UserID existiert
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public boolean existsUserId(String userId) throws Exception {

        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            Document userDoc = dbConnectionService.getCollection()
                    .find(new BasicDBObject("_id", new ObjectId(userId)))
                    .first();
            if (userDoc == null) {
                return false;
            } else {
                return true;
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }

    /**
     * Prüft, ob der Username bereits in der DB vorhanden ist
     * @param userName {String} eindeutiger Username
     * @return {boolean} TRUE oder FALSE je nachdem, ob Username existiert
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public boolean existsUserName(String userName) throws Exception {

        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            Document userDoc = dbConnectionService.getCollection()
                    .find(new BasicDBObject("userName", userName))
                    .first();
            if (userDoc == null) {
                return false;
            } else {
                return true;
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }

    public boolean existsEmail(String email) throws Exception {

        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            Document userDoc = dbConnectionService.getCollection()
                    .find(new BasicDBObject("email", email)).first();
            if (userDoc == null) {
                return false;
            } else {
                return true;
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }

    /**
     * Fügt einen neuen User in die DB hinzu, sofern der Username und die
     * Email noch nicht existieren
     * @param user {IUser} neuer User
     * @return {String} von der DB generierte UserID
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public void addUser(IUser user) throws Exception {

        // Prüfen, ob der Username oder die Email bereits existiert
        if (existsUserName(user.getUserName()) && !existsEmail(user.getEmail())){
            throw new Exception("addUser_userOrEmailExists");
        }

        // hash aus Passwort berechnen
        user.setPassword(hashPassword(user.getPassword()));
        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            dbConnectionService.getCollection().insertOne(buildUserDocument
                    (user));
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        }
    }

    public String hashPassword(String password) {

        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private Document buildUserDocument(IUser user) {

        return new Document("username", user.getUserName() )
                .append("password", user.getPassword())
                .append("email", user.getEmail())
                .append("isMailPublic", user.getIsMailPublic())
                .append("surname", user.getSurname())
                .append("firstName", user.getFirstname())
                .append("gender", user.getGender())
                .append("language", user.getLanguage())
                .append("pictureURL", user.getPictureURL())
                .append( "createdIdeas", new ArrayList<Document>()) // statt null eine ArrayList -- noch nicht getestet 17.11.16
                .append("numberCreatedIdeas", user.getNumberCreatedIdeas())
                .append( "followedIdeas", new ArrayList<Document>())  // statt null eine ArrayList -- noch nicht getestet 17.11.16
                .append("numberFollowed", user.getNumberFollowedIdeas());
    }

    public boolean validatePassword(String plaintextPassword, String
            hashedPassword) {

        if (BCrypt.checkpw(plaintextPassword, hashedPassword)) {
            return true;
        } else {
            return false;
        }
    }
}
