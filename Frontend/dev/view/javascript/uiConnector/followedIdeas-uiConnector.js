ideaWatcher.view.FollowedIdeas = ideaWatcher.view.FollowedIdeas || (function () {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var htmlView = null;
        var htmlProfileView = null;
    	var ideaList = null;


        //region lade zu internationalisierende HTML-Elemente

        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector FollowedIdeas');

            var idea1 = {
        			name : 'Testname1',
        			description : 'description Test1',
        			likes : 5,
        			follower : 7,
        			comments : 14
        		}
        		var idea2 = {
        			name : 'Testname2',
        			description : 'description Test2',
        			likes : 4,
        			follower : 8,
        			comments : 4
        		}
        		var listIdeas = [ idea1, idea2 ];
        		cbRenderList(listIdeas);
        		
            //region assign html elements
            htmlView = document.querySelector('.followedIdeas_view');
            htmlProfileView = document.querySelector('.profile_view');
            //endregion

            //region register Callbacks
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.FollowedIdeas.registerShowView(cbShowView);
            ideaWatcher.controller.FollowedIdeas.registerRenderList(cbRenderList);
            //endregion

            // lokalisiere die View anhand der global definierten Sprache
            localizeView();

        }
        //endregion

        function cbRenderList(itemList) {

            // localization:
            var language = ideaWatcher.core.Localizer.getLanguage();
            //baue die IdeeElemente und füge sie zu oberstem div als section hinzu
         
            htmlView = document.querySelector('.followedIdeas_view');
            var header = document.createElement('h1');
            header.textContent =  ideaWatcher.core.Localizer.FollowedIdeas[language].header;
            htmlView.appendChild(header);
            var ideaList = ideaWatcher.view.service.ideaList.renderList(itemList);   
            htmlView.appendChild(ideaList);
        }
        
        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {

                localizeView();
                console.log("Zeige FollowedIdeas-View an...");
                htmlProfileView.style.display = 'block';
                htmlView.style.display = 'block';
            }
            else
            {
                console.log("Blende FollowedIdeas-View aus ...");
                htmlProfileView.style.display = 'none';
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der FollowedIdeas-View ...");


            console.log("Lokalisierung FollowedIdeas-View abgeschlossen.")
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };

    })();