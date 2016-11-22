package main.java.de.ideaWatcher.dataManager;

import main.java.de.ideaWatcher.dataManager.controllers.IdeaController;
import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.dataManager.controllers.UserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.IDataManager;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController
        .IUserController;

/**
 * Created by geopras on 07.11.16.
 */
public class DataManager implements IDataManager {

    private IUserController userController;
    private IIdeaController ideaController;

    @Override
    public IUserController getUserController() {

        return userController;
    }

    @Override
    public IIdeaController getIdeaController() {
        return ideaController;
    }

    @Override
    public void initialize() {
        //TODO: Hier Name der jeweiligen Collection (json-Datei) angeben
        this.userController = new UserController(new UserService("testLogin"));
        this.ideaController = new IdeaController(new IdeaService("ideaCollection"));
    }
}
