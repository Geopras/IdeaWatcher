package main.java.de.ideaWatcher.webApi.dataManagerInterfaces;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IUserController;

/**
 * Interface zur Implementierung eines DataManagers
 */
public interface IDataManager {

    /**
     * Gibt die zentrale Instanz des UserControllers zurueck, der fuer alle
     * Abfragen der User-DB da ist
     * @return
     */
    IUserController getUserController();

    /**
     * Gibt die zentrale Instanz des IdeaControllers zurueck, der fuer alle
     * Abfragen der Idea-DB da ist
     * @return
     */
    IIdeaController getIdeaController();

    /**
     * Initialisiert den DataManager.
     */
    void initialize();
}
