ideaWatcher.view.Navigation = ideaWatcher.view.Navigation || (function () {

        // region local vars
        // Event Globale Initialisierung

        var htmlView;
        var htmlMainMenuParentNode;
        var htmlMainMenuChildNodes;
        var htmlMainMenuButtons = [];
        var isLoginSuccessful;
        var htmlUserDropdownNoLogin;
        var htmlUserDropdownWithLogin;

        // endregion

        // region subscribe to events
        ideaWatcher.controller.Navigation.registerInitializeView(cbIni);
        ideaWatcher.controller.Navigation.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.Navigation.registerLoginSuccessful(cbLoginSuccessful);
        ideaWatcher.controller.Navigation.registerLogoutSuccessful(cbLogoutSuccessful);
        // endregion

        //region Callback Functions
        function cbIni() {

            console.log('ini Event');

            htmlView = document.querySelector('.mainMenu_view');

            isLoginSuccessful = false;
            htmlUserDropdownNoLogin = document.querySelector('.mainMenu_dropdownUserNoLogin_ul');
            htmlUserDropdownWithLogin = document.querySelector('.mainMenu_dropdownUserWithLogin_ul');

            // Navigation-Buttonliste:
            htmlMainMenuParentNode = document.querySelector('.mainMenu_buttons_ul');
            // Navigation-Buttons:
            htmlMainMenuChildNodes = htmlMainMenuParentNode.children;

            // Gehe alle Navigation-Buttons durch, speichere sie und hänge
            // EventListener dran: (falls eine Button-Klasse unbekannt ist,
            // wird das in der Console gemeldet):
            for (var i = 0; i < htmlMainMenuChildNodes.length; i++) {

                var mainMenuElement = htmlMainMenuChildNodes[i];
                var childClass = mainMenuElement.className;

                switch (childClass) {

                    case ('mainMenu_homeButton_li'):
                        initializeHomeButton(mainMenuElement);
                        break;
                    case ('mainMenu_ideaList_li'):
                        initializeIdeaListButton(mainMenuElement);
                        break;
                    case ('mainMenu_category_li'):
                        initializeCategoryButtons();
                        break;
                    case ('mainMenu_user_li'):
                        initializeUserButtons();
                        break;
                    case ('mainMenu_mySearch_li'):
                        initializeMySearchButton(mainMenuElement);
                        break;
                    case ('mainMenu_languageSwitch_div'):
                        initializeLanguageSwitchButton();
                        break;
                    default:
                        console.log('Es wurde die Navigation-Button-Klasse "' +
                            childClass + '" NICHT im' +
                            ' mainMenu-uiConnector initialisiert!');
                }
            }
            cbLocalizeView();
        }

        function cbLocalizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            for (var i = 0; i < htmlMainMenuButtons.length; i++) {

                var mainMenuButton = htmlMainMenuButtons[i];
                var buttonId = mainMenuButton.getAttribute('data-buttonId');
                var buttonLabel = ideaWatcher.core.Localizer
                    .MainMenuButtonLabels[language];
                var localizedText = buttonLabel[buttonId];
                mainMenuButton.textContent = localizedText;
            }
        }

        function cbLoginSuccessful() {
            isLoginSuccessful = true;
            switchUserDropdown();
        }

        function cbLogoutSuccessful() {
            isLoginSuccessful = false;
            switchUserDropdown();

            // Gehe auf die zuletzt angezeigte IdeaList
            ideaWatcher.controller.IdeaList
                .updateIdeaList('', '', 1, 10, true);
        }

        //endregion

        //region Initialisiere und speichere Navigation-Buttons

        //region Home-Button
        function initializeHomeButton(htmlELement) {

            var button = htmlELement.getElementsByTagName('img').item(0);
            button.addEventListener('click', handleIdeaListButton);
            htmlMainMenuButtons.push(button);
        }
        //endregion

        //region ListIdea-Button
        function initializeIdeaListButton(htmlElement) {

            var button = htmlElement.getElementsByTagName('div').item(0);
            button.addEventListener('click', handleIdeaListButton);
            htmlMainMenuButtons.push(button);
        }

        function handleIdeaListButton(clickEvent) {

            var listType = clickEvent.target.attributes.getNamedItem('data-buttonid').nodeValue;
            console.log('IdeaList vom Typ: "' + listType + '" geklickt');

            var category = ideaWatcher.model.IdeaList.Category.NONE;
            ideaWatcher.controller.IdeaList
                .updateIdeaList(listType, category, 1, 10, true);
        }
        //endregion

        //region Category-Buttons
        function initializeCategoryButtons() {

            //Category-Hauptbutton
            var categoryButton = document.querySelector('.mainMenu_category_button');
            htmlMainMenuButtons.push(categoryButton);

            var categoryList = document.querySelector('.mainMenu_dropdownCategories_ul');
            var categoryNodes = categoryList.children;

            for (var j = 0; j < categoryNodes.length; j++) {

                iniCategoryButton(categoryNodes[j]);
            }
        }

        function iniCategoryButton(htmlElement) {

            var button = htmlElement.getElementsByTagName('div').item(0);
            button.addEventListener('click', handleCategoryButton);
            htmlMainMenuButtons.push(button);
        }

        function handleCategoryButton(clickEvent) {

            var category = clickEvent.target.attributes.getNamedItem('data-buttonid').nodeValue;
            console.log('Kategorie: "' + category + '" geklickt');

            ideaWatcher.controller.IdeaList.updateIdeaList('', category, 1, 10, true);
        }
        //endregion

        //region User-Buttons
        function initializeUserButtons() {

            var userButtonNoLoginList = document.querySelector('.mainMenu_dropdownUserNoLogin_ul');
            var userButtonNoLoginNodes = userButtonNoLoginList.children;

            for (var j = 0; j < userButtonNoLoginNodes.length; j++) {

                initializeNavigationButton(userButtonNoLoginNodes[j]);
            }

            var userButtonWithLoginList = document.querySelector('.mainMenu_dropdownUserWithLogin_ul');
            var userButtonWithLoginNodes = userButtonWithLoginList.children;

            for (var j = 0; j < userButtonWithLoginNodes.length; j++) {

                var htmlElement = userButtonWithLoginNodes[j];
                var userButton = htmlElement.getElementsByTagName('div').item(0);;
                if (userButton.getAttribute('data-buttonid') === 'LOGOUT') {
                    initializeLogoutButton(userButton);
                } else {
                    initializeNavigationButton(htmlElement);
                }
            }
        }
        //endregion

        //region Logout-Button
        function initializeLogoutButton(logoutButton) {

            logoutButton.addEventListener('click', handleLogoutButton);
            htmlMainMenuButtons.push(logoutButton);
        }

        function handleLogoutButton(clickEvent) {

            ideaWatcher.controller.Navigation.logoutUser();
        }
        //endregion

        //region MySearch-Button
        function initializeMySearchButton(htmlElement) {

            var button = htmlElement.getElementsByTagName('img').item(0);
            button.addEventListener('click', handleNavigationButton);
            htmlMainMenuButtons.push(button);
        }
        //endregion

        //region Reiner SwitchView-Button
        function initializeNavigationButton(htmlElement) {

            var button = htmlElement.getElementsByTagName('div').item(0);
            button.addEventListener('click', handleNavigationButton);
            htmlMainMenuButtons.push(button);
        }

        function handleNavigationButton(clickEvent) {

            var buttonId = clickEvent.target.attributes.getNamedItem('data-buttonid').nodeValue;
            console.log('Navigation-Button ' + buttonId + ' geklickt');

            ideaWatcher.core.Navigator.switchView({
                viewId: ideaWatcher.model.Navigation.ViewId[buttonId],
                url: ideaWatcher.model.Navigation.ViewUrl[buttonId]
            });
        }
        //endregion

        //region Language-Switch-Button
        function initializeLanguageSwitchButton() {

            var htmlLanguageSwitch = document.querySelector('.mainMenu_languageSwitch_label');
            var button = htmlLanguageSwitch.getElementsByTagName('input').item(0);
            button.addEventListener('click', handleCheckboxLanguageSwitch);
            htmlMainMenuButtons.push(button);
        }

        function handleCheckboxLanguageSwitch(clickEvent) {

            var language = ideaWatcher.core.Localizer.getLanguage();

            if (language === 'de_DE') {
                ideaWatcher.core.Localizer.setLanguage('en_GB');
            } else {
                ideaWatcher.core.Localizer.setLanguage('de_DE');
            }

            ideaWatcher.core.Localizer.localizeCurrentViews();
        }
        //endregion

        //endregion

        //region Verändere View
        function switchUserDropdown() {

            if (isLoginSuccessful) {

                htmlUserDropdownNoLogin.style.display = 'none';
                htmlUserDropdownWithLogin.style.display = 'block';
            } else {

                htmlUserDropdownNoLogin.style.display = 'block';
                htmlUserDropdownWithLogin.style.display = 'none';
            }
        }
        //endregion

        return {};

    })();