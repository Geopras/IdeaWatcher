package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

/**
 * Interface für Definition der Benutzerverwaltungsschnittstelle
 */
public interface IUserController {

    /**
     * Methode ueberprueft, ob die UserID in der Datenbank bereits existiert
     * @param userId ID des Users
     * @return true, falls die UserID bereits in der Datenbank existiert,
     * ansonsten false
     * @throws Exception wenn es bei der Abfrage zu irgendeinem Problem gekommen ist
     */
    boolean existsUserId(String userId) throws Exception;

    /**
     * Methode ueberprueft, ob der Username in der Datenbank bereits existiert
     * @param userName Name des Users
     * @return true, falls der UserName bereits in der Datenbank existiert, ansonsten false
     * @throws Exception wenn es bei der Abfrage zu irgendeinem Problem gekommen ist
     */
    boolean existsUserName(String userName) throws Exception;

    /**
     * Methode ueberprueft, ob die Email in der Datenbank bereits existiert
     * @param email Email des Users
     * @return true, falls die Email bereits in der Datenbank existiert,
     * ansonsten false
     * @throws Exception wenn es bei der Abfrage zu irgendeinem Problem gekommen ist
     */
    boolean existsEmail(String email) throws Exception;

    /**
     * Methode fuegt Nutzer zur Datenbank hinzu
     * @param {IUser} user object
     * @throws Exception wenn es beim Speichern in der Datenbank zu Problemen kommt
     */
    void addUser(IUser user)
            throws Exception;

    /**
     * Methode holt einen User anhand seiner UserID aus der Datenbank und
     * gibt ihn zurück.
     * @param userId {String} eindeutige UserID
     * @return den gewuenschten User
     * @throws Exception falls es beim Holen des Users zu irgendwelchen Problemen gekommen ist
     */
    IUser getUser(String userId) throws Exception;

    /**
     * Methode gibt UserID zur UserSession Angabe (Username oder email) zurueck
     * @param userNameOrEmail {String} Username oder Email
     * @return {String} die zugehoerige UserID
     * @throws Exception falls es beim Holen des Users zu irgendwelchen Problemen gekommen ist
     */
    String getUserId(String userNameOrEmail) throws Exception;

    /**
     * Validate password
     * @param plaintextPassword
     * @param hashedPassword
     * @return {boolean} true if password is equal hash password
     */
    boolean isCorrectPassword(String plaintextPassword, String hashedPassword);

    /**
     * Loescht einen vorhandenen User
     * @param userId {String} eindeutige UserID
     * @throws Exception falls der User nicht existiert oder ein Problem beim
     * Zugriff auf die Datenbank auftrat
     */
    void deleteUser(String userId) throws Exception;

    /**
     * Aendert einen vorhandenen User
     * @param userId {String} eindeutige UserId
     * @param user {IUser} geaendertes User-Objekt
     * @throws Exception falls der User nicht existiert oder ein Problem beim
     * Zugriff auf die Datenbank auftrat
     */
    void updateUser(IUser user) throws Exception;
}
