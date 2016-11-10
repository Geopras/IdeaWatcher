ideaWatcher.view.FollowedIdeas = ideaWatcher.view.FollowedIdeas || (function () {

        //region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbIni
        };

        var htmlView = null;
        var htmlProfileView = null;

        //region lade zu internationalisierende HTML-Elemente

        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector FollowedIdeas');

            //region assign html elements
            htmlView = document.querySelector('.followedIdeas_view');
            htmlProfileView = document.querySelector('.profile_view');
            //endregion

            //region register Callbacks
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.FollowedIdeas.registerShowView(cbShowView);
            //endregion

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