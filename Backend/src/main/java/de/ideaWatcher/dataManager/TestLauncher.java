package main.java.de.ideaWatcher.dataManager;

import main.java.de.ideaWatcher.dataManager.controllers.IdeaController;
import main.java.de.ideaWatcher.dataManager.controllers.UserController;
import main.java.de.ideaWatcher.dataManager.services.IdeaDataGenerator;
import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.dataManager.services.UserService;

public class TestLauncher {

    public static void main(String[] args) throws Exception {
        UserService us = new UserService("users");
        IdeaService is = new IdeaService("ideas");
        
        UserController uc = new UserController(us);
        IdeaController ic = new IdeaController(is);
        IdeaDataGenerator test = new IdeaDataGenerator(is, us);
        
        test.createRandomUserCollection(9);
        test.createRandomIdeaCollection(10);

    }

}
