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
    
    public static boolean isCorrectPassword(String password) {
        
        // hole Hash aus der Datenbank
        String hashed = "";
        
        //überprüfe, ob Passwörter überein stimmen
        
        if (BCrypt.checkpw(password, hashed)) {
            //Passwörter stimmen überein
        } else {
//            Passwörter stimmen nicht überein
        }
        
        return true;
    }
    
    private static String hashPassword(String password) {
    
        String hash = BCrypt.hashpw(password, BCrypt.gensalt());
        return hash;
    }
}
