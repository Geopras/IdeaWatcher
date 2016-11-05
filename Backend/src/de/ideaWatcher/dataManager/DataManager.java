package de.ideaWatcher.dataManager;

import de.ideaWatcher.webApi.model.User;

public class DataManager {

    
    public DataManager() {
        
    }
    
    public boolean existsUser(String userName) {
        
        //falls User existiert: gibt true zurück
        //falls User nicht existiert: gib false zurück
        return false;
    }
    
    public void addUser(String userName, String email, String password) throws Exception {
        
        //speichere neuen Nutzer in der Datenbank
        //weise ihm eine UserId zu
        
        //falls es zu Fehlern kommt
        throw new Exception("Der Nutzer existiert bereits.");
        
    }
    
    public User getUser(String userName) {
        return new User();
    }
}
