package main.java.de.ideaWatcher.dataManager.controllers;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

/**
 * Schnittstellen zur Idea-Datenbank
 */
public class IdeaController implements IIdeaController {

    @Override
    public void addNewIdea(IIdea idea) throws Exception {

    }

    @Override
    public IIdea getIdea(String ideaName) throws Exception {
        return null;
    }

    @Override
    public void deleteIdea(String ideaName) throws Exception {

    }

    @Override
    public void changeIdea(IIdea idea) throws Exception {

    }
}
