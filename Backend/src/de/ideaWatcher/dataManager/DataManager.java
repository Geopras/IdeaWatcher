package de.ideaWatcher.dataManager;

import de.ideaWatcher.dataManager.controllers.UserController;
import de.ideaWatcher.dataManager.databaseServices.UserDbService;
import de.ideaWatcher.webApi.dataManagerInterfaces.IDataManager;
import de.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;

/**
 * Created by geopras on 07.11.16.
 */
public class DataManager implements IDataManager {

    @Override
    public IUserController getInstanceUser() {

        return new UserController(new UserDbService());
    }
}
