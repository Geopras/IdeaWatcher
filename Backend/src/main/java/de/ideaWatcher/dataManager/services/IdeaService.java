package main.java.de.ideaWatcher.dataManager.services;

/**
 * Service fuer Zugriff auf Datenbank
 */
public class IdeaService {

    private DbConnectionService dbConnectionService;

    public IdeaService() {
        this.dbConnectionService = new DbConnectionService("ideaCollection");
    }
}
