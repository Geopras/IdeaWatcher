package de.ideaWatcher.dataManager;

import de.ideaWatcher.webApi.model.User;

public class DataManager {
    
    /**
     * Methode ueberprueft, ob der Nutzer in der Datenbank bereits existiert
     * @param userName Name des Users
     * @return true, falls der UserName bereits in der Datenbank existiert, ansonsten false
     * @throws Exception wenn es bei der Abfrage zu irgendeinem Problem gekommen ist
     */
    public static boolean existsUser(String userName) throws Exception {
        
        //falls UserName existiert: gibt true zurück
        //falls UserName nicht existiert: gib false zurück
        return false;
    }
    
    /**
     * Methode fuegt Nutzer zur Datenbank hinzu
     * @param userID
     * @param userName 
     * @param email
     * @param password - gehashter Wert
     * @throws Exception wenn es beim Speichern in der Datenbank zu Problemen kommt
     */
    public static void addUser(String userName, String email, String password)
            throws Exception {
        
        // hash aus Passwort berechnen
        String hashedPassword = hashPassword(password);
        //TODO: UserID erzeugen
        int UserID;
        //speichere neuen Nutzer(userID, userName, e-mail, hashedPassword) in der Datenbank
        
        //falls es zu Fehlern kommt
        throw new Exception("Der Nutzer existiert bereits.");
        
    }
    
    /**
     * Methode holt einen User anhand seines UserNamens aus der Datenbank und gibt ihn zurück.
     * @param userName
     * @return den gewuenschten User
     * @throws Exception falls es beim Holen des Users zu irgendwelchen Problemen gekommen ist
     */
    public static User getUser(String userName) throws Exception {

        return new User();
    }
    
    /**
     * 
     * @param plaintextPassword
     * @param hashedPassword
     * @return
     */
    public static boolean isCorrectPassword(String plaintextPassword, String hashedPassword) {
        
        //überprüfe, ob Passwörter überein stimmen
        
        if (BCrypt.checkpw(plaintextPassword, hashedPassword)) {
            return true;
        } else {
            return false;
        }
    }
    
    
    private static String hashPassword(String password) {
    
        String hash = BCrypt.hashpw(password, BCrypt.gensalt());
        return hash;
    }
}
