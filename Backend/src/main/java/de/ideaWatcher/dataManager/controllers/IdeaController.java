package main.java.de.ideaWatcher.dataManager.controllers;

import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

/**
 * Schnittstellen zur Idea-Datenbank
 */
public class IdeaController implements IIdeaController {

    @Override
    public String addNewIdea(IIdea idea) throws Exception {
        return "";
    }

    @Override
    public IIdea getIdea(String ideaId) throws Exception {
        return null;
    }

    @Override
    public void deleteIdea(String ideaId) throws Exception {

    }

    @Override
    public void changeIdea(String ideaId, IIdea idea) throws Exception {

    }
}
