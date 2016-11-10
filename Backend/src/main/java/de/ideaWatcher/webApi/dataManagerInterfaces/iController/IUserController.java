package main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

/**
 * Interface für Definition der Benutzerverwaltungsschnittstelle
 */
public interface IUserController {

    /**
     * Methode ueberprueft, ob der Nutzer in der Datenbank bereits existiert
     * @param userName Name des Users
     * @return true, falls der UserName bereits in der Datenbank existiert, ansonsten false
     * @throws Exception wenn es bei der Abfrage zu irgendeinem Problem gekommen ist
     */
    boolean existsUser(String userName) throws Exception;

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
     * Methode holt einen User anhand seines User-Namens aus der Datenbank und
     * gibt ihn zurück.
     * @param userName
     * @return den gewuenschten User
     * @throws Exception falls es beim Holen des Users zu irgendwelchen Problemen gekommen ist
     */
    IUser getUser(String userName) throws Exception;

    /**
     * Validate password
     * @param plaintextPassword
     * @param hashedPassword
     * @return {boolean} true if password is equal hash password
     */
    boolean isCorrectPassword(String plaintextPassword, String hashedPassword);
}
