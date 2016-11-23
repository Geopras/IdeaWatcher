ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu || (function () {

        // region local vars

        var htmlView;
        var htmlMainMenuParentNode;
        var htmlMainMenuChildNodes;
        var htmlMainMenuButtons = [];
        var isLoginSuccessful;
        var htmlUserDropdownNoLogin;
        var htmlUserDropdownWithLogin;
        var lastClickedButton;
        var currentClickedButton;
        var lastClickedMainIdeaListButton;

        // endregion

        // region subscribe to events
        ideaWatcher.controller.MainMenu.registerInitializeView(cbIni);
        ideaWatcher.controller.MainMenu.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.MainMenu.registerLoginSuccessful(cbLoginSuccessful);
        ideaWatcher.controller.MainMenu.registerLogoutSuccessful(cbLogoutSuccessful);
        ideaWatcher.controller.MainMenu.registerClickHotButton(cbClickHotButton);

        // endregion

        //region Callback Functions
        function cbIni() {

            console.log('ini Event');

            htmlView = document.querySelector('.mainMenu_view');

            isLoginSuccessful = false;
            htmlUserDropdownNoLogin = document.querySelector('.mainMenu_dropdownUserNoLogin_ul');
            htmlUserDropdownWithLogin = document.querySelector('.mainMenu_dropdownUserWithLogin_ul');

            // MainMenu-Buttonliste:
            htmlMainMenuParentNode = document.querySelector('.mainMenu_buttons_ul');
            // MainMenu-Buttons:
            htmlMainMenuChildNodes = htmlMainMenuParentNode.children;

            // Gehe alle MainMenu-Buttons durch, speichere sie und hänge
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
                        console.log('Es wurde die MainMenu-Button-Klasse "' +
                            childClass + '" NICHT im' +
                            ' mainMenu-uiConnector initialisiert!');
                }
            }
            // Untermenü in Profilansicht muss auch gespeichert werden:

            // MainMenu-Buttonliste:
            htmlMainMenuParentNode = document.querySelector('.profileView_subMenuButtons');
            // MainMenu-Buttons:
            htmlMainMenuChildNodes = htmlMainMenuParentNode.children;

            for (i = 0; i < htmlMainMenuChildNodes.length; i++) {

                mainMenuElement = htmlMainMenuChildNodes[i];
                childClass = mainMenuElement.className;

                switch (childClass) {

                    case ('mainMenu_ideaList_li'):
                        initializeIdeaListButton(mainMenuElement);
                        break;
                    case ('profileView_myProfileButton_li'):
                        initializeNavigationButton(mainMenuElement);
                        break;
                    default:
                        console.log('Es wurde die Profil-Menu-Button-Klasse "' +
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
            cbClickHotButton();
        }

        function cbLogoutSuccessful() {
            isLoginSuccessful = false;
            switchUserDropdown();
            cbClickHotButton();
        }

        //endregion

        //region Initialisiere und speichere MainMenu-Buttons

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
            handleCurrentButtonClick(clickEvent);
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
            categoryButton.addEventListener('click', handleCurrentButtonClick);
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
            handleCurrentButtonClick(clickEvent);
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
                var userButton = htmlElement.getElementsByTagName('div').item(0);
                var buttonId = userButton.getAttribute('data-buttonid');

                if (htmlElement.className === 'mainMenu_ideaList_li') {
                    initializeIdeaListButton(htmlElement);
                    continue;
                }
                else if (buttonId === ideaWatcher.model.Navigation.ButtonId.LOGOUT) {
                    initializeLogoutButton(userButton);
                } else {
                    initializeNavigationButton(htmlElement);
                }
            }
        }
        //endregion

        //region Logout-Button
        function initializeLogoutButton(button) {

            button.addEventListener('click', handleLogoutButton);
            htmlMainMenuButtons.push(button);
        }

        function handleLogoutButton(clickEvent) {

            handleCurrentButtonClick(clickEvent);
            ideaWatcher.controller.MainMenu.logoutUser();
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
            handleCurrentButtonClick(clickEvent);
            console.log('MainMenu-Button ' + buttonId + ' geklickt');

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

            handleCurrentButtonClick(clickEvent);
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

        // click HotButton automatisch
        function cbClickHotButton() {

            document.getElementById('mainMenu_hot_button').click();
        }

        //region Was soll passieren, wenn irgendein Button geklickt wird

        function handleCurrentButtonClick(clickEvent) {

            var clickedButton = clickEvent.target;
            if (!lastClickedButton) {
                lastClickedButton = clickedButton;
            } else {
                lastClickedButton = currentClickedButton;
            }
            currentClickedButton = clickedButton;

            // Wenn HomeButton geklickt, dann Hot-Button klicken
            if (clickedButton.id === 'mainMenu_homeButton_img') {
                lastClickedButton.style.background = ''; // CSS-Eigenschaft
                // zurücksetzen, sodass der allgemeine Hover-Button-Style
                // wieder greift
                cbClickHotButton();
            }
            // Wenn Hot, Fresh oder Trending geklickt, dann soll dieser
            // Button markiert und extra gespeichert werden
            else if (clickedButton.id.toLowerCase().includes('hot') ||
                clickedButton.id.toLowerCase().includes('fresh') ||
                clickedButton.id.toLowerCase().includes('trending')) {

                if (lastClickedMainIdeaListButton) {
                    lastClickedMainIdeaListButton.style.background = '';
                }
                lastClickedMainIdeaListButton = clickedButton;
                lastClickedButton.style.background = '';
                currentClickedButton.style.background = '#4096ee';
            }
            // Wenn Kategorie-Button geklickt, dann diesen zusätzlich zu zuletzt
            // geklickten Hot-, Fresh-, Trending-Button markieren:
            else if (clickedButton.id.toLowerCase().includes('category')) {
                lastClickedButton.style.background = '';
                lastClickedMainIdeaListButton.style.background = '#4096ee';
                currentClickedButton.style.background = '#4096ee';
            } else { // ansonsten Markierung vom letzten Button auflösen
                lastClickedButton.style.background = '';
                lastClickedMainIdeaListButton.style.background = '';
            }
        }
        //endregion

        return {};

    })();