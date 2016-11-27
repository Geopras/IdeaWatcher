ideaWatcher.view.Profile = ideaWatcher.view.Profile || (function () {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var evLocalizeViewMyIdeas = {
                topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYIDEAS.NONE,
                cbFunction: localizeView
            };
        
        var evLocalizeViewFollowedIdeas = {
                topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYFOLLOWEDIDEAS.NONE,
                cbFunction: localizeView
            };
        
        var evLocalizeViewProfileEdit = {
                topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYPROFILE,
                cbFunction: localizeView
            };
        var htmlView = null;

        //region lade zu internationalisierende HTML-Elemente
        var htmlMyIdeasButton = null;
        var htmlFollowedIdeasButton = null;
        var htmlProfileEditButton = null;
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewMyIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewFollowedIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeViewProfileEdit);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector Profile');

            //region assign html elements
            htmlView = document.querySelector('.profile_view');
            htmlMyIdeasButton = document.querySelector('.profileSubMenu_myIdeas_button');
            htmlFollowedIdeasButton = document.querySelector('.profileSubMenu_followedIdeas_button');
            htmlProfileEditButton = document.querySelector('.profileSubMenu_profileEdit_button');
            //endregion

            //region register Callbacks
            // wam.logic.UserSession.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.Profile.registerShowView(cbShowView);
            //endregion

            htmlMyIdeasButton.addEventListener('click', handleButtonNavigationMyIdeas);
            htmlFollowedIdeasButton.addEventListener('click', handleButtonNavigationFollowedIdeas);
            htmlProfileEditButton.addEventListener('click', handleButtonNavigationEditProfile);

            // lokalisiere die View anhand der global definierten Sprache
            localizeView();

        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {

                localizeView();
                console.log("Zeige Profile-View an...");
                htmlView.style.display = 'block';
            }
            else
            {
                console.log("Blende Profile-View aus ...");
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der Profile-View ...");
            htmlMyIdeasButton = document.querySelector('.profileSubMenu_myIdeas_button');
            htmlFollowedIdeasButton = document.querySelector('.profileSubMenu_followedIdeas_button');
            htmlProfileEditButton = document.querySelector('.profileSubMenu_profileEdit_button');
            
            htmlMyIdeasButton.textContent = ideaWatcher.core.Localizer.profile[language].myIdeas;
            htmlFollowedIdeasButton.textContent = ideaWatcher.core.Localizer.profile[language].followedIdeas;
            htmlProfileEditButton.textContent = ideaWatcher.core.Localizer.profile[language].profile;
            
            console.log("Lokalisierung ProfileView abgeschlossen.")
        }
        //endregion

        function handleButtonNavigationMyIdeas(clickEvent){

            var listType = ideaWatcher.model.IdeaList.ListType.MYIDEAS;
            var category = ideaWatcher.model.IdeaList.Category.NONE;

            ideaWatcher.controller.IdeaList
                .updateIdeaList(listType, category, 1, 10, true);
        }

        function handleButtonNavigationFollowedIdeas(clickEvent){

            var listType = ideaWatcher.model.IdeaList.ListType.MYFOLLOWEDIDEAS;
            var category = ideaWatcher.model.IdeaList.Category.NONE;

            ideaWatcher.controller.IdeaList
                .updateIdeaList(listType, category, 1, 10, true);
        }

        function handleButtonNavigationEditProfile(clickEvent){

            ideaWatcher.core.Navigator.switchView({
                viewId: ideaWatcher.model.Navigation.ViewId.MYPROFILE,
                url: ideaWatcher.model.Navigation.ViewUrl.MYPROFILE
            });
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };

    })();

