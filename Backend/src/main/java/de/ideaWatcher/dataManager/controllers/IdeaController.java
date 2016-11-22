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
    public void addNewIdea(IIdea idea, String userId) throws Exception {
        this.ideaService.addIdea(idea, userId);
    }

    @Override
    public IIdea getIdea(String ideaId) throws Exception {
        return this.ideaService.getIdea(ideaId);
    }

    @Override
    public List<IIdea> getAllIdeas() throws Exception {
        return this.ideaService.getAllIdeas();

    }

    @Override
    public void deleteIdea(String ideaId) throws Exception {
        this.ideaService.deleteUser(ideaId);
    }

    @Override
    public void updateIdea(IIdea idea) throws Exception {
        this.ideaService.updateIdea(idea);
    }
}
