package de.ideaWatcher.dataManager.controllers;

import de.ideaWatcher.dataManager.BCrypt;
import de.ideaWatcher.dataManager.databaseServices.UserDbService;
import de.ideaWatcher.dataManager.pojos.User;
import main.java.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;
import main.java.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs.IUser;

/**
 * Controller der statische Schnittstellen-Methoden zur Abfrage, Neuanlage und
 * Veränderung von User-Daten anbietet
 *
 */
public class UserController implements IUserController {

    private UserDbService userDbService;

    public UserController(UserDbService userDbService) {
        this.userDbService = userDbService;
    }

    @Override
    public boolean existsUser(String userName) throws Exception {

        //falls UserName existiert: gibt true zurück
        //falls UserName nicht existiert: gib false zurück
        return false;
    }

    @Override
    public Long addUser(String userName, String email, String password)
            throws Exception {

        // hash aus Passwort berechnen
        String hashedPassword = hashPassword(password);
        //TODO: UserID erzeugen
        //TODO: speichere neuen Nutzer(userID, userName, e-mail,
        //TODO: hashedPassword) in der Datenbank

        //falls es zu Fehlern kommt
        throw new Exception("Der Nutzer existiert bereits.");

    }

    @Override
    public IUser getUser(String userName) throws Exception {

        return new User();
    }

    @Override
    public boolean isCorrectPassword(String plaintextPassword, String hashedPassword) {

        //ueberprüfe, ob Passwoerter uebereinstimmen

        if (BCrypt.checkpw(plaintextPassword, hashedPassword)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String hashPassword(String password) {

        String hash = BCrypt.hashpw(password, BCrypt.gensalt());
        return hash;
    }

}
