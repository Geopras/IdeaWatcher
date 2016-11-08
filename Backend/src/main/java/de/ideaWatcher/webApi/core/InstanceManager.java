package main.java.de.ideaWatcher.webApi.core;

/**
 * Created by geopras on 08.11.16.
 */
public class InstanceManager {

    private static RequestManager requestManager;

    public static RequestManager getRequestManager() {
        return requestManager;
    }

}
