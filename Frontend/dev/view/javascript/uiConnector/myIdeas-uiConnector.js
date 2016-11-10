ideaWatcher.view.MyIdeas = ideaWatcher.view.MyIdeas || (function () {

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
            console.log('Initialisiere UIConnector MyIdeas');

            //region assign html elements
            htmlView = document.querySelector('.myIdeas_view');
            htmlProfileView = document.querySelector('.profile_view');
            //endregion

            //region register Callbacks
            // wam.logic.Login.registerVerificationError(cbShowVerificationError);
            ideaWatcher.controller.MyIdeas.registerShowView(cbShowView);
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
                console.log("Zeige MyIdeas-View an...");
                htmlProfileView.style.display = 'block';
                htmlView.style.display = 'block';
            }
            else
            {
                console.log("Blende MyIdeas-View aus ...");
                htmlProfileView.style.display = 'none';
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der MyIdeas-View ...");


            console.log("Lokalisierung MyIdeasView abgeschlossen.")
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };

    })();