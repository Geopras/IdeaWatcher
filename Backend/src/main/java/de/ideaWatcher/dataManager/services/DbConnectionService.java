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

    public MongoClient getMongoClient() {
        return this.mongoClient;
    }

    public MongoDatabase getDb() {
        return db;
    }

    public MongoCollection<Document> getCollection() {
        return collection;
    }

    public DbConnectionService(String collectionName) {
        this.collectionName = collectionName;
    }

    public void openConnection() {

        this.mongoClient = new MongoClient("localhost", 27017);
        //this.db = mongoClient.getDatabase("ideaWatcher");
        //this.collection = db.getCollection("ideaWatchUser");
        this.db = this.mongoClient.getDatabase("local");
        this.collection = this.db.getCollection(this.collectionName);
    }

    public void closeConnection(){
        System.out.println("bye... mongoDB-connection closed");
        this.mongoClient.close();
    }
}
