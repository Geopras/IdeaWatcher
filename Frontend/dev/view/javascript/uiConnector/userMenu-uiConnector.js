ideaWatcher.view.UserMenu = ideaWatcher.view.UserMenu || (function () {

        //region local vars
        var htmlView = null;
        var htmlButtons = [];

        //region subscribe to events
        ideaWatcher.controller.UserMenu.registerInitializeView(cbIni);
        ideaWatcher.controller.UserMenu.registerShowView(cbShowView);
        ideaWatcher.controller.UserMenu.registerLocalizeView(cbLocalizeView);
        //endregion

        //region cbIni
        function cbIni()
        {
            console.log('Initialisiere UIConnector UserMenu');

            //region assign html elements
            htmlView = document.querySelector('.userMenu_view');

            var myIdeasButton = document.querySelector('.userMenu_myIdeas_button');
            myIdeasButton.addEventListener('click', handleButtonClick);
            htmlButtons.push(myIdeasButton);

            var myFollowedIdeasButton = document.querySelector('.userMenu_followedIdeas_button');
            myFollowedIdeasButton.addEventListener('click', handleButtonClick);
            htmlButtons.push(myFollowedIdeasButton);

            var myProfileButton = document.querySelector('.userMenu_profileEdit_button');
            myProfileButton.addEventListener('click', handleButtonClick);
            htmlButtons.push(myProfileButton);
            //endregion

            //region register Callbacks
            // wam.logic.UserSession.registerVerificationError(cbShowVerificationError);
            //endregion

            // lokalisiere die View anhand der global definierten Sprache
            cbLocalizeView();

        }
        //endregion

        //region showView
        function cbShowView(obj)
        {
            if (obj.shouldShow) {

                cbLocalizeView();
                console.log("Zeige UserMenu-View an...");
                htmlView.style.display = 'block';
            } else {

                console.log("Blende UserMenu-View aus ...");
                htmlView.style.display = 'none';
            }
        }
        //endregion

        //region localizeView()
        function cbLocalizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            console.log("Starte Lokalisierung der UserMenu-View ...");

            htmlButtons.forEach(function (button) {

                var buttonId = button.attributes.getNamedItem('data-button-id').value;
                button.textContent = ideaWatcher.core.Localizer.UserMenu[language][buttonId];
            });
            
            console.log("Lokalisierung ProfileView abgeschlossen.")
        }
        //endregion

        function handleButtonClick(clickEvent) {

            var clickedButtonId = clickEvent.target.attributes.getNamedItem('data-button-id').value;

            // setze Hintergrundfarbe
            htmlButtons.forEach(function (button) {

                var buttonId = button.attributes.getNamedItem('data-button-id').value;
                if (buttonId === clickedButtonId) {

                    button.style.background = '#4096ee';
                } else {

                    button.style.background = '';
                }
            });

            var listType = ideaWatcher.model.IdeaList.ListType[clickedButtonId];
            if (listType) {

                ideaWatcher.controller.UserMenu.showIdeaList(listType);
            } else {

                ideaWatcher.controller.UserMenu.switchView(clickedButtonId);
            }
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

        };

    })();

