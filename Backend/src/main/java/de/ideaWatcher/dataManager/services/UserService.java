package main.java.de.ideaWatcher.dataManager.services;

import com.mongodb.BasicDBObject;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import main.java.de.ideaWatcher.dataManager.BCrypt;
import main.java.de.ideaWatcher.dataManager.pojos.Creator;
import main.java.de.ideaWatcher.dataManager.pojos.User;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.ICreator;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;
import org.bson.Document;
import org.bson.types.ObjectId;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import javax.naming.directory.SearchResult;

/**
 * Klasse fuer Zugriff auf User-Datenbank
 */
public class UserService {

    private DbConnectionService dbConnectionService;

    public UserService(String collectionName) {
        this.dbConnectionService = new DbConnectionService(collectionName);
    }

    /**
     * Gibt den User anhand seiner UserID aus der DB zurück
     * @param userId {String} eindeutige UserID
     * @return {IUser} User-Objekt
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public IUser getUser(String userId) throws Exception {

        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            Document userDoc = dbConnectionService.getCollection()
                    .find(new BasicDBObject("_id", new ObjectId
                            (userId))).first();
            if (userDoc != null) {
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
     * Gibt eine Liste aller User zurück
     * @return {List<IUser>} Liste mit IUser
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public List<IUser> getAllUsers() throws Exception {
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        List<Document> usersDoc = null;
        try {
            usersDoc = dbConnectionService.getCollection()
                    .find().into(new ArrayList<Document>());
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        }  
        List<IUser> users = new ArrayList<IUser>();
        for(Document d : usersDoc){
            users.add(buildUser(d));
        }
        return users;
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

            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            userDoc = dbConnectionService.getCollection()
                    .find(new BasicDBObject("userName", userNameOrEmail))
                    .first();
            // Wenn userName gefunden, dann gib userId zurück
            if (userDoc != null) {
                //System.out.println("ID: " + userDoc.get("_id").toString());
                return userDoc.get("_id").toString();
            }
            // Wenn userName nicht gefunden, dann nach email schauen
            userDoc = dbConnectionService.getCollection()
                    .find(new BasicDBObject("email", userNameOrEmail))
                    .first();
            if (userDoc != null) {
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
    /**
     * Baut Document in IUser um
     * @param userDoc {Document} ein User-Document
     * @return {IUser} gibt Objekt IUser zurück
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
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
        user.setPictureURL(userDoc.getString("pictureURL"));
        user.setNumberCreatedIdeas(userDoc.getLong("numberCreatedIdeas"));
        user.setNumberFollowedIdeas(userDoc.getLong("numberFollowedIdeas"));
        user.setCreatedIdeas((List<String>) userDoc.get("createdIdeas"));
        user.setFollowedIdeas((List<String>) userDoc.get("followedIdeas"));
        return user;
    }
    
    /**
     * Baut IUser in Document um
     * @param user {Document} ein User-Document
     * @return {Document} gibt Objekt Document zurück
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    private static Document buildUserDocument(IUser user) {

        return new Document("userName", user.getUserName() )
                .append("password", user.getPassword())
                .append("email", user.getEmail())
                .append("isMailPublic", user.getIsMailPublic())
                .append("surname", user.getSurname())
                .append("firstName", user.getFirstname())
                .append("gender", user.getGender())
                .append("language", user.getLanguage())
                .append("pictureURL", user.getPictureURL())
                .append( "createdIdeas", user.getCreatedIdeas())
                .append("numberCreatedIdeas", user.getNumberCreatedIdeas())
                .append( "followedIdeas", user.getFollowedIdeas())
                .append("numberFollowedIdeas", user.getNumberFollowedIdeas());
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
    /**
     * Hashwert von Passwort berechnen
     * @param password {String}Passwort im Klartext
     * @return {String} Hashwert des Passwortes
     */
    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    /**
     * Prüft auf valides Passwort
     * @param plaintextPassword {String} Passwort im Klartext
     * @param hashedPassword {String} Passwort im Hashwert
     * @return {boolean} 
     */
    public boolean validatePassword(String plaintextPassword, String
            hashedPassword) {

        if (BCrypt.checkpw(plaintextPassword, hashedPassword)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * fügt der DB eine Liste von usern hinzu (Testdaten)
     * @param userList {List<IUser>} Liste mit Usern
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */
    public void addUserList(List<IUser> userList) throws Exception {
        List<Document> userListDoc = new ArrayList<>();
        for( IUser idea : userList){
            userListDoc.add(buildUserDocument(idea));
        }        
        
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        try {
            dbConnectionService.getCollection().insertMany(userListDoc);
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        } 
    }
    
    /**
     * Update eines Usersdokuments in der DB
     * @param user {IUser} ein User Objekt
     * @return {UpdateResult} Informationen über Anzahl der Datensätze
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */   
    public UpdateResult updateUser(IUser user) throws Exception{
        Document newDoc = new Document();
        newDoc = buildUserDocument(user);
        
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        UpdateResult ur = null;
        try {
            
            ur = dbConnectionService.getCollection().replaceOne(
                    Filters.eq("_id", new ObjectId (user.getUserId())), newDoc);
            updateIsMailPublicToAdjustIdeas(user, user.getIsMailPublic());
            
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        } 
        return ur;
    }
    /**
     * Löscht einen User
     * @param userId {String} ID eines User-Dokuments
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */ 
    public void deleteUser(String userId) throws Exception{
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        try {
            dbConnectionService.getCollection().findOneAndDelete(
                    Filters.eq("_id", new ObjectId (userId))); 
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();           
        } 
    }
    /**
     * Update auf bestimmte Werte eines Documents User
     * @param userId {String} ID eines User-Dokuments
     * @param type {String} Datenfeld eines User-Dokuments
     * @param value {String} Wert eines Datenfeldes eines User-Dokuments
     * @throws Exception falls Probleme beim Zugriff auf die DB auftreten
     */ 
    public void updateApropertyOfaUser (String userId, String type, String value) throws Exception {
        try{
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }    
            if( type.equals("isMailPublic")){
                boolean newValue = false;
                if(value.equals("true") || value.equals("1")){
                    newValue = true;
                    dbConnectionService.getCollection().updateOne(Filters.eq(
                            "_id", new ObjectId(userId)), new Document(
                                    "$set", new Document(type, newValue)));
                    
                }
                updateIsMailPublicToAdjustIdeas(userId, newValue);
            } else {
                dbConnectionService.getCollection().updateOne(Filters.eq(
                        "_id", new ObjectId(userId)), new Document(
                                "$set", new Document(type, value)));
            }

        } catch(Exception en){
            throw new Exception(en);
        }
        finally {
            dbConnectionService.closeConnection();
        }
    }
    
    private static ICreator buildUserToCreator(IUser user){
        Document userDoc = new Document();
        userDoc = buildUserDocument(user);
        ICreator creator = new Creator();
        creator = IdeaService.buildCreator(userDoc);
        return creator;
    }

    private static void updateIsMailPublicToAdjustIdeas(IUser user, boolean isPublicMail) throws Exception{
        ICreator creator = new Creator();
        creator = buildUserToCreator(user);
        IdeaService is = new IdeaService("ideasCollection");
        List<IIdea> ideaList = new ArrayList<IIdea>();
        // Testen mit der ID, ob das mit dem String auch geht -- es geht nicht. 
        //ideaList = is.getIdeaList("creator.userId", creator.getUserId());
        ideaList = is.getIdeaList("creator.userName", creator.getUserName());
        
        for(IIdea idea : ideaList){
            idea.getCreator().setIsMailPublic(isPublicMail);
        }
        is.updateModifiedIsMailPublic(ideaList);

    }
    private void updateIsMailPublicToAdjustIdeas(String userId, boolean isPublicMail) throws Exception{
        IUser user = new User();
        user = getUser(userId);
        updateIsMailPublicToAdjustIdeas(user, isPublicMail);
    }
    public List<IUser> getUserList(String type, String value) throws Exception{
        if (!dbConnectionService.isOpen()) {
            dbConnectionService.openConnection();
        }
        List<Document> userDoc = new ArrayList<Document>();
        List<IUser> userList = new ArrayList<IUser>();
        try {
            userDoc = dbConnectionService.getCollection().find(Filters.eq(type, value)).into(new
                    ArrayList<>());
            for(Document doc : userDoc){
                userList.add(buildUser(doc));
            }
        } catch (Exception ex) {
            throw new Exception(ex);
        } finally {
            dbConnectionService.closeConnection();
        } 
        return userList;
    }
    
    public void updateFollowedIdeas(List<IUser> userList) throws Exception{
        try {
            if (!dbConnectionService.isOpen()) {
                dbConnectionService.openConnection();
            }
            Document upDocValue;
            Document upDocQuery;
            Document upDocSet;
            for( IUser user : userList){
                upDocQuery = new Document("_id", new ObjectId(user.getUserId()) );
                upDocValue = new Document("followedIdeas" , user.getFollowedIdeas());
                upDocSet = new Document("$set", upDocValue);            
                dbConnectionService.getCollection().updateOne(upDocQuery, upDocSet );
                if(user.getNumberFollowedIdeas() > 0){
                    upDocValue =  new Document("numberFollowedIdeas" , user.getNumberFollowedIdeas() - 1 );
                    dbConnectionService.getCollection().updateOne(upDocQuery, upDocSet );
                }
            } 
        } catch (Exception en) {
            throw new Exception(en);
        } finally {
            dbConnectionService.closeConnection();
        }   
    }

    
}
