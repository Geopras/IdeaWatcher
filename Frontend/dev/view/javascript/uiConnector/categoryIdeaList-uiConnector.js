ideaWatcher.view.CategoryIdeaList = ideaWatcher.view.CategoryIdeaList || (function VCategoryIdeaList() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlView = null;
    var htmlHeader = null;
    var htmlIdeaDescription = null;
    var numberOfLikes = null;
    var numberOfFollowers = null;
    var numberOfComments = null;
    var ideaList = null;
    var header;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector CategoryIdeaList');

                //endregion

        htmlView = document.querySelector('.categoryIdeaList_view');
        htmlHeader = document.createElement('h3');

        var idea1 = {
          		name:'Testname1',
          		description:'description Test1',
          		likes: 5,
          		follower: 7,
          		comments: 14
          }
          var idea2 = {
          		name:'Testname2',
          		description:'description Test2',
          		likes: 4,
          		follower:8,
          		comments:4
          }
          var listIdeas = [idea1,idea2];
          cbRenderList(listIdeas);


          
        //region register Callbacks
        ideaWatcher.controller.CategoryIdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.CategoryIdeaList.registerRenderList(cbRenderList);
        //endregion 
        
    }
    //endregion

    function cbRenderList(itemList) {

        // localization:
        var language = ideaWatcher.core.Localizer.getLanguage();
        //baue die IdeeElemente und füge sie zu oberstem div als section hinzu

        htmlHeader.textContent =  ideaWatcher.core.Localizer.CategoryIdeaList[language].header;
        htmlView.appendChild(htmlHeader);
        ideaList = ideaWatcher.view.component.IdeaList.renderList(itemList);
     
        htmlView = document.querySelector('.categoryIdeaList_view');
        header = document.createElement('h1');
        htmlView.appendChild(header);
        htmlView.appendChild(ideaList);
    }
    
    //region showView
    function cbShowView(obj)
    {
        if(obj.shouldShow)
        {
            htmlView.style.display = 'block';
            renderHeader(obj.additionalData.categoryName);
        }
        else
        {
            htmlView.style.display = 'none';
        }
    }
    //endregion
    
    function renderHeader(categoryName) {
    	 header.textContent = categoryName ;
    }

    return {

    };

})();