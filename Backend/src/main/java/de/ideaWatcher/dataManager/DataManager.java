package main.java.de.ideaWatcher.dataManager;

import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.dataManager.controllers.UserController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.IDataManager;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iControllers
        .IUserController;

/**
 * Created by geopras on 07.11.16.
 */
public class DataManager implements IDataManager {

    @Override
    public IUserController getInstanceUser() {

        return new UserController(new UserService());
    }
}
