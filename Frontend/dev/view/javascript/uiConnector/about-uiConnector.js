ideaWatcher.view.About = ideaWatcher.view.About
    || (function() {

        // region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic : 'internal/ini',
            cbFunction : cbiIni
        };
        var htmlView;
        // endregion

        // region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        // endregion

        function cbiIni() {
            console.log('ini Event');
            htmlView = document.querySelector('.about_view');

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

            // htmlCopyrightText.textContent =
            //     ideaWatcher.core.Localizer.FootBar[language].copyright_text;
            // htmlAboutButton.textContent =
            //     ideaWatcher.core.Localizer.FootBar[language].about;
        }

        return {

        };

    })();