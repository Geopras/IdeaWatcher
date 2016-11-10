ideaWatcher.view.Profile = ideaWatcher.view.Profile || (function VProfile() {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var htmlView = null;

        //region lade zu internationalisierende HTML-Elemente
        var htmlMyIdeasButton = null;
        var htmlFollowedIdeasButton = null;
        var htmlProfileEditButton = null;
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
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
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
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

