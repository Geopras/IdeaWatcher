package main.java.de.ideaWatcher.dataManager.services;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/**
 * Service zur Verbindung mit der Datenbank
 */
public class DbConnectionService {

    private MongoClient mongoClient;
    private MongoDatabase db;
    private MongoCollection<Document> collection;
    private String collectionName;
    private boolean isOpen;

    public MongoClient getMongoClient() {
        return this.mongoClient;
    }

    public MongoDatabase getDb() {
        return db;
    }

    public MongoCollection<Document> getCollection() {
        return collection;
    }

    public boolean isOpen() {
        return this.isOpen;
    }

    public DbConnectionService(String collectionName) {
        this.collectionName = collectionName;
    }

    public void openConnection() throws Exception {

        try {
            this.mongoClient = new MongoClient("localhost", 27017);
            //this.db = mongoClient.getDatabase("ideaWatcher");
            //this.collection = db.getCollection("ideaWatchUser");
            this.db = this.mongoClient.getDatabase("local");
            this.collection = this.db.getCollection(this.collectionName);

            this.isOpen = true;
            System.out.println("MongoDB-Verbindung geöffnet");
        } catch (Exception ex) {

            throw new Exception(ex);
        }
    }

    public void closeConnection() throws Exception {
        try {
            this.mongoClient.close();
            this.isOpen = false;
            System.out.println("MongoDB-Verbindung geschlossen");
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }
}
