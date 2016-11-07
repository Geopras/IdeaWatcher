package de.ideaWatcher.dataManager.databaseServices;

/**
 * Service zur Verbindung mit der Datenbank
 */
public class DBconnectionService {

    private MongoClient mongoClient;
    private MongoDatabase db;
    private MongoCollection<Document> collection;

    public MongoClient getMongoClient() {
        return this.mongoClient;
    }

    public MongoDatabase getDb() {
        return db;
    }

    public MongoCollection<Document> getCollection() {
        return collection;
    }

    private MongoClient mongoClient;
    private MongoDatabase db;
    private MongoCollection<Document> collection;

    public DBconnectionService() {
        this.mongoClient = new MongoClient("localhost", 27017);
        //this.db = mongoClient.getDatabase("ideaWatcher");
        //this.collection = db.getCollection("ideaWatchUser");
        this.db = mongoClient.getDatabase("ideaWatch");
        this.collection = db.getCollection("ideaWatcher");
    }

    public void closeConnection(){
        System.out.println("bye... connection closed");
        this.mongoClient.close();
    }
}
