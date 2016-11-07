package de.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs;

/**
 * Interface zur Erstellung der POJO-Klasse User
 */
public interface IUser {

    /**
     * Gibt den Benutzernamen zurueck
     * @return {String} user name
     */
    String getName();

    /**
     * Legt den Benutzernamen fest
     * @param name {String} Benutzername
     */
    void setName(String name);

    /**
     * Gibt die User ID zurueck
     * @return {Long} user id
     */
    Long getUserId();

    /**
     * Legt die User ID fest
     * @param userId {Long}
     */
    void setUserId(Long userId);

    /**
     * Gibt das Passwort als Hash-Wert zurueck
     * @return {String} Passwort im Hash-Format
     */
    String getPassword();

    /**
     * Legt das Passwort als Hash-Wert fest
     * @param password
     */
    void setPassword(String password);
}
