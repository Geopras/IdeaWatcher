package main.java.de.ideaWatcher.dataManager.services;

/**
 * Service fuer Zugriff auf Datenbank
 */
public class IdeaService {

    private DBconnectionService dbConnectionService;

    public IdeaService() {
        this.dbConnectionService = new DBconnectionService("IdeaCollection");
    }
}
