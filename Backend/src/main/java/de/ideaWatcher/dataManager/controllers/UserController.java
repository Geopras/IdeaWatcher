package main.java.de.ideaWatcher.dataManager.controllers;

import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iPOJOs.IUser;

/**
 * Controller der statische Schnittstellen-Methoden zur Abfrage, Neuanlage und
 * Veränderung von User-Daten anbietet
 *
 */
public class UserController implements IUserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean existsUser(String userName) throws Exception {

        try {
            return userService.existsUser(userName);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public boolean existsEmail(String email) throws Exception {

        try {
            return userService.existsEmail(email);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public void addUser(IUser user) throws Exception {

        try {
            this.userService.addUser(user);
        } catch (Exception ex) {
            throw new Exception(ex);
        }

    }

    @Override
    public IUser getUser(String userName) throws Exception {

        try {
            return this.userService.getUser(userName);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public boolean isCorrectPassword(String plaintextPassword, String hashedPassword) {

        return this.userService.isCorrectPassword(plaintextPassword,
                hashedPassword);
    }
}
