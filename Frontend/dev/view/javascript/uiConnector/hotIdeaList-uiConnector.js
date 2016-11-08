ideaWatcher.view.HotIdeaList = ideaWatcher.view.HotIdeaList || (function VHotIdeaList() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbIni
    };

    var htmlView = null;
    var ideaList = null;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    //region cbIni
    function cbIni()
    {
        console.log('Initialisiere UIConnector HotIdeaList');

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
        ideaWatcher.controller.HotIdeaList.registerShowView(cbShowView);
        ideaWatcher.controller.HotIdeaList.registerRenderList(cbRenderList);
        //endregion 
        
    }
    //endregion

    function cbRenderList(itemList) {

        // localization:
        var language = ideaWatcher.core.Localizer.getLanguage();
        //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
     
        htmlView = document.querySelector('.hotIdeaList_view');
        var header = document.createElement('h3');
        header.textContent =  ideaWatcher.core.Localizer.HotIdeaList[language].header;
        htmlView.appendChild(header);
        var ideaList = ideaWatcher.view.service.ideaList.renderList(itemList);   
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