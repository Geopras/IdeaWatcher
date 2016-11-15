ideaWatcher.view.About = ideaWatcher.view.About
    || (function() {

        // region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic : 'internal/ini',
            cbFunction : cbiIni
        };

        var evLocalizeView = {
            topic: 'localizeView/About',
            cbFunction: localizeView
        };

        var htmlView;
        var htmlHeader;
        var htmlContentDE;
        // endregion

        // region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        // endregion

        function cbiIni() {
            console.log('ini Event');
            htmlView = document.querySelector('.about_view');
            htmlHeader = document.getElementById('about_header');
            htmlContentDE = document.querySelector('.about_content_de_DE');

            ideaWatcher.controller.About.registerShowView(cbShowView);
        }

        //region showView
        function cbShowView(obj)
        {
            if(obj.shouldShow)
            {
                localizeView();
                htmlView.style.display = 'block';
            }
            else
            {
                htmlView.style.display = 'none';
            }
        }
        //endregion

        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der About-View ...");

            htmlHeader.textContent =
                ideaWatcher.core.Localizer.About[language].header;

            if (language == "de_DE"){
                htmlContentDE.style.display = 'block';
            } else {
                htmlContentDE.style.display = 'none';
            }
        }

        return {

        };

    })();