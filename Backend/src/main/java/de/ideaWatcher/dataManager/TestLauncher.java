package main.java.de.ideaWatcher.dataManager;

import org.bson.Document;

import main.java.de.ideaWatcher.dataManager.controllers.IdeaController;
import main.java.de.ideaWatcher.dataManager.controllers.UserController;
import main.java.de.ideaWatcher.dataManager.services.DbConnectionService;
import main.java.de.ideaWatcher.dataManager.services.UserDataGenerator;
import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.dataManager.services.UserService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IUser;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

public class TestLauncher {

    public static void main(String[] args) throws Exception {

        String collectionName = "usersCollection";    
        UserDataGenerator test = new UserDataGenerator( collectionName);
        List<IUser> userList = new ArrayList<IUser>();
        userList =test.createRandomUserList(1000);      
        List<IIdea> ideaList = new ArrayList<IIdea>();  
        ideaList = test.createRandomIdeaCollection(500, userList);
 
        UserService us = new UserService(collectionName);
        us.addUserList(userList);
        /*
        for(IIdea i : ideaList){
            System.out.println(i.getName());
        }
        */
        collectionName = "ideasCollection";
        IdeaService is = new IdeaService(collectionName);
        is.addIdeaList(ideaList);

    }
}
