ideaWatcher.view.TrendingIdeaList = ideaWatcher.view.TrendingIdeaList || (function () {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlView = null;
    var htmlIdeaHeader = null;
    var htmlIdeaDescription = null;
    var numberOfLikes = null;
    var numberOfFollowers = null;
    var numberOfComments = null;
    var ideaList = null;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector TrendingIdeaList');

                //endregion

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
        ideaWatcher.controller.TrendingIdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.TrendingIdeaList.registerRenderList(cbRenderList);
        //endregion 
        
    }
    //endregion

    function cbRenderList(itemList) {

        // localization:
        var language = ideaWatcher.core.Localizer.getLanguage();
        //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
     
        htmlView = document.querySelector('.trendingIdeaList_view');
        var header = document.createElement('h1');
        header.textContent =  ideaWatcher.core.Localizer.TrendingIdeaList[language].header;
        htmlView.appendChild(header);
        var ideaList = ideaWatcher.view.component.IdeaList.renderList(itemList);
        htmlView.appendChild(ideaList);
    }
    
    //region showView
    function cbShowView(obj)
    {
        if(obj.shouldShow)
        {
            htmlView.style.display = 'block';
        }
        else
        {
            htmlView.style.display = 'none';
        }
    }
    //endregion

    return {

    };

})();