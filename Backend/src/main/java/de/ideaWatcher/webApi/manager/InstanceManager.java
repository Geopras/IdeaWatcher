package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.dataManager.DataManager;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.IDataManager;

/**
 * Stellt verschiedene Manager statisch zur Verfuegung
 */
public class InstanceManager {

    public static RequestManager requestManager;
    public static IDataManager dataManager;

    public static RequestManager getRequestManager() {
        return requestManager;
    }

    public static IDataManager getDataManager() {
        return dataManager;
    }

    public static void initialize() {
        requestManager = new RequestManager();
        requestManager.initialize();
        dataManager = new DataManager();
    }

}
