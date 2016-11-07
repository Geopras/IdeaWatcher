package de.ideaWatcher.webApi.dataManagerInterfaces.iControllers;

import de.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs.IUser;

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
     * Methode fuegt Nutzer zur Datenbank hinzu
     * @param userName
     * @param email
     * @param password - gehashter Wert
     * @throws Exception wenn es beim Speichern in der Datenbank zu Problemen kommt
     */
    Long addUser(String userName, String email, String password)
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

    /**
     * Generiert Hash-Wert aus dem Passwort-String
     * @param password {String}
     * @return {String} Hash-Wert
     */
    String hashPassword(String password);
}
