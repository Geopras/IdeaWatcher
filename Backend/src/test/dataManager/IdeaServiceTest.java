package test.dataManager;

import junit.framework.Assert;
import main.java.de.ideaWatcher.dataManager.services.IdeaService;
import main.java.de.ideaWatcher.webApi.dataManagerInterfaces.iModel.IIdea;
import org.junit.Test;

import java.util.List;

/**
 * Created by geopras on 01.12.16.
 */
public class IdeaServiceTest {

    @Test
    public void searchIdea_return_true_if_correct_idea_was_found() throws Exception {

        IdeaService ideaService = new IdeaService("ideasCollection");
        String searchText = "idee nummer 11";

        List<IIdea> foundIdeas = ideaService.searchIdea(searchText);
        String expectedFoundIdeaId = "583f1972a7986c42e7fa920c";
        Assert.assertEquals(expectedFoundIdeaId, foundIdeas.get(0).getIdeaId());

    }
}
