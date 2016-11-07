package main.java.de.ideaWatcher.webApi.dataManagerInterfaces;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iControllers.IUserController;

/**
 * Interface zur Implementierung eines DataManagers
 */
public interface IDataManager {

    /**
     * Gibt eine neue Instanz des Typs IUserController zurueck, der fuer alle
     * Abfragen der User-DB da ist
     * @return
     */
    IUserController getInstanceUser();
}
