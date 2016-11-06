package de.ideaWatcher.dataManager;

import de.ideaWatcher.webApi.model.User;

public class DataManager {
    
    public static boolean existsUser(String userName) throws Exception {
        
        //falls User existiert: gibt true zurück
        //falls User nicht existiert: gib false zurück
        return false;
    }
    
    public static void addUser(String userName, String email, String password)
            throws Exception {
        
        // hash aus Passwort berechnen
        String hashedPassword = hashPassword(password);
        //speichere neuen Nutzer(userName, e-mail, hashedPassword) in der Datenbank
        //weise ihm eine UserId zu
        
        //falls es zu Fehlern kommt
        throw new Exception("Der Nutzer existiert bereits.");
        
    }
    
    public static User getUser(String userName) throws Exception {

        return new User();
    }
    
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
