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
    public String addNewIdea(IIdea idea, String userId) throws Exception {
        return this.ideaService.addIdea(idea, userId);
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
    public List<IIdea> getAllIdeasSmart() throws Exception {
        return this.ideaService.getAllIdeasSmart();
    }

    @Override
    public List<IIdea> getPublishedCategorizedIdeas(String category) throws Exception {
        return this.ideaService.getPublishedCategorizedIdeas(category);
    }

    @Override
    public List<IIdea> getPublishedIdeas() throws Exception {
        return this.ideaService.getPublishedIdeas();
    }

    @Override
    public void deleteIdea(String ideaId) throws Exception {
        this.ideaService.deleteIdea(ideaId);
    }

    @Override
    public void updateIdea(IIdea idea) throws Exception {
        this.ideaService.updateIdea(idea);
    }
    @Override
    public void updateApropertyOfaIdea(String ideaId, String type, String value) throws Exception {
        this.ideaService.updateApropertyOfaIdea(ideaId, type, value);
    }

    @Override
    public void updateRankings(List<IIdea> ideaList) throws Exception {
        // TODO Auto-generated method stub
        this.ideaService.updateRankings(ideaList);
    }

    @Override
    public List<IIdea> searchIdeas(String searchText) throws Exception {
        return this.ideaService.searchIdea(searchText);
    }


}
