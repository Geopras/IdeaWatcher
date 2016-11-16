package main.java.de.ideaWatcher.dataManager.controllers;

import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

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
    public boolean existsUserId(String userId) throws Exception {

        try {
            return userService.existsUserId(userId);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public boolean existsUserName(String userName) throws Exception {

        try {
            return userService.existsUserName(userName);
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
    public IUser getUser(String userId) throws Exception {

        try {
            return this.userService.getUser(userId);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public String getUserId(String userNameOrEmail) throws Exception {

        try {
            return this.userService.getUserId(userNameOrEmail);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Override
    public boolean isCorrectPassword(String plaintextPassword, String hashedPassword) {

        return this.userService.validatePassword(plaintextPassword,
                hashedPassword);
    }

    @Override
    public void deleteUser(String userId) throws Exception {

    }

    @Override
    public void changeUser(String userId, IUser user) throws Exception {

    }
}
