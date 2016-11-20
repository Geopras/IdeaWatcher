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
    private static IdeaManager ideaManager;

    public static RequestManager getRequestManager() {
        return requestManager;
    }

    public static IDataManager getDataManager() {
        return dataManager;
    }

    public static TokenManager getTokenManager() {
        return tokenManager;
    }

    public static IdeaManager getIdeaManager() {
        return ideaManager;
    }

    public static void initialize() throws Exception {
        requestManager = new RequestManager();
        requestManager.initialize();
        dataManager = new DataManager();
        dataManager.initialize();
        tokenManager = new TokenManager();
        ideaManager = new IdeaManager();
        ideaManager.initialize();
    }

}
