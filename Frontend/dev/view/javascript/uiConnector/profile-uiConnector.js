ideaWatcher.view.Profile = ideaWatcher.view.Profile || (function VProfile() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var evLocalizeViewMyIdeas = {
                topic: 'localizeView/myIdeas',
                cbFunction: localizeView
            };
        
        var evLocalizeViewFollowedIdeas = {
                topic: 'localizeView/followedIdeas',
                cbFunction: localizeView
            };
        
        var evLocalizeViewProfileEdit = {
                topic: 'localizeView/profileEdit',
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

            ideaWatcher.core.Navigator.switchView({
                viewId: 'myIdeas',
                url: 'myProfile'
            });
        }

        function handleButtonNavigationFollowedIdeas(clickEvent){

            ideaWatcher.core.Navigator.switchView({
                viewId: 'followedIdeas',
                url: 'myProfile'
            });
        }

        function handleButtonNavigationEditProfile(clickEvent){

            ideaWatcher.core.Navigator.switchView({
                viewId: 'profileEdit',
                url: 'myProfile'
            });
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };

    })();

