package de.ideaWatcher.dataManager;

import de.ideaWatcher.dataManager.databaseServices.UserDbService;
import de.ideaWatcher.dataManager.controllers.UserController;
import main.java.ideaWatcher.webApi.dataManagerInterfaces.IDataManager;
import main.java.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;

/**
 * Created by geopras on 07.11.16.
 */
public class DataManager implements IDataManager {

    @Override
    public IUserController getInstanceUser() {

        return new UserController(new UserDbService());
    }
}
