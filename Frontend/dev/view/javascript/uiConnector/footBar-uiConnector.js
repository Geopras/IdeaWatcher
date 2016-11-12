ideaWatcher.view.FootBar = ideaWatcher.view.FootBar
    || (function() {

        // region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic : 'internal/ini',
            cbFunction : cbiIni
        };
        var htmlView;
        var htmlAboutButton;
        var htmlCopyrightText;
        // endregion

        // region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        // endregion

        function cbiIni() {
            console.log('ini Event');
            htmlView = document.querySelector('.footBar_view');
            htmlAboutButton = document.querySelector('.footBar_about_button');
            htmlCopyrightText = document.getElementById('footBar_copyright_span');

            htmlAboutButton.addEventListener('click', handleButtonInfo);

            localizeView();
        }

        function handleButtonInfo(clickEvent) {

            console.log('htmlBtnAbout geklickt');
            ideaWatcher.core.Navigator.switchView({
                viewId : 'About',
                url : 'About'
            });
        }

        function localizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der FootBar-View ...");

            htmlCopyrightText.textContent =
                ideaWatcher.core.Localizer.FootBar[language].copyright_text;
            htmlAboutButton.textContent =
                ideaWatcher.core.Localizer.FootBar[language].about;
        }

        return {

        };

    })();