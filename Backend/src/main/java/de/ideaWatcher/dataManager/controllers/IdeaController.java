package main.java.de.ideaWatcher.dataManager.controllers;

import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iController.IIdeaController;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;

import java.util.List;

/**
 * Schnittstellen zur Idea-Datenbank
 */
public class IdeaController implements IIdeaController {

    private IdeaService ideaService;

    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @Override
    public String addNewIdea(IIdea idea) throws Exception {

        return this.ideaService.addIdea(idea);
    }

    @Override
    public IIdea getIdea(String ideaId) throws Exception {
        // ToDO
        return null;
    }

    @Override
    public List<IIdea> getAllIdeas() throws Exception {
        // ToDO
        return this.ideaService.getAllIdeas();

    }

    @Override
    public void deleteIdea(String ideaId) throws Exception {
        // ToDO
    }

    @Override
    public void changeIdea(String ideaId, IIdea idea) throws Exception {
        // ToDO
    }
}
