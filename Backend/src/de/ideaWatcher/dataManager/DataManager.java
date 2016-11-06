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
        
        //speichere neuen Nutzer in der Datenbank
        //weise ihm eine UserId zu
        
        //falls es zu Fehlern kommt
        throw new Exception("Der Nutzer existiert bereits.");
        
    }
    
    public static User getUser(String userName) throws Exception {

        return new User();
    }
    
    public static boolean isCorrectPassword(String password) {
        return true;
    }
    
    private String hashPassword(String password) {
        
        String hash = "";
        return hash;
    }
}
