package main.java.de.ideaWatcher.webApi.manager;

import main.java.de.ideaWatcher.dataManager.DataManager;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.IDataManager;

/**
 * Stellt verschiedene Manager statisch zur Verfuegung
 */
public class InstanceManager {

    private static RequestManager requestManager;
    private static IDataManager dataManager;
    private static TokenManager tokenManager;

    public static RequestManager getRequestManager() {
        return requestManager;
    }

    public static IDataManager getDataManager() {
        return dataManager;
    }

    public static TokenManager getTokenManager() {
        return tokenManager;
    }

    public static void initialize() {
        requestManager = new RequestManager();
        requestManager.initialize();
        dataManager = new DataManager();
        tokenManager = new TokenManager();
    }

}
