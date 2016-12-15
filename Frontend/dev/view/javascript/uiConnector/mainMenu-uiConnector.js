ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu || (function () {

        // region local vars

        var htmlView;
        var htmlUserDropdownNoLogin;
        var htmlUserDropdownWithLogin;
        var htmlUserMenuParentNode;
        var htmlMainMenuButtons = [];
        var isLoginSuccessful;
        var lastClickedButton;
        var currentClickedButton;
        var lastClickedMainIdeaListButton;
        var currentClickedListType;
        var lastClickedNoSearchListType;
        var currentClickedCategory;
        var hotButton;
        var loginButton;
        var htmlProfileEditButton;
        var htmlFollowedIdeasButton;
        var htmlMyIdeasButton;

        // endregion

        // region subscribe to events
        ideaWatcher.controller.MainMenu.registerInitializeView(cbIni);
        ideaWatcher.controller.MainMenu.registerLocalizeView(cbLocalizeView);
        ideaWatcher.controller.MainMenu.registerLoginSuccessful(cbLoginSuccessful);
        ideaWatcher.controller.MainMenu.registerLogoutSuccessful(cbLogoutSuccessful);
        ideaWatcher.controller.MainMenu.registerWebSocketConnectionOpen(cbWebSocketConnectionOpen);
        ideaWatcher.controller.MainMenu.registerGetCurrentClickedListType(cbCurrentClickedListType);
        ideaWatcher.controller.MainMenu.registerGetCurrentClickedCategory(cbCurrentClickedCategory);
        // endregion

        //region Callback Functions
        // Initialisierung des MainMenu
        function cbIni() {

            console.log('ini Event');

            htmlView = document.querySelector('.mainMenu_view');

            isLoginSuccessful = false;
            htmlUserDropdownNoLogin = document.querySelector('.mainMenu_dropdownUserNoLogin_ul');
            htmlUserDropdownWithLogin = document.querySelector('.mainMenu_dropdownUserWithLogin_ul');
            htmlUserMenuParentNode = document.querySelector('.userMenu_Buttons');
            htmlMyIdeasButton = document.querySelector('.userMenu_myIdeas_button');
            htmlFollowedIdeasButton = document.querySelector('.userMenu_followedIdeas_button');
            htmlProfileEditButton = document.querySelector('.userMenu_profileEdit_button');

            // MainMenu-Buttonliste:
            var htmlMainMenuParentNode = document.querySelector('.mainMenu_buttons_ul');
            // MainMenu-Buttons:
            var htmlMainMenuChildNodes = htmlMainMenuParentNode.children;

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
                    case ('mainMenu_about_li'):
                        initializeAboutButton();
                        break;
                    default:
                        console.log('Es wurde die MainMenu-Button-Klasse "' +
                            childClass + '" NICHT im' +
                            ' mainMenu-uiConnector initialisiert!');
                }
            }

            currentClickedListType = ideaWatcher.model.IdeaList.ListType.HOT;
            lastClickedNoSearchListType = currentClickedListType;
            currentClickedCategory = ideaWatcher.model.IdeaList.Category.NONE;
            hotButton = document.getElementById('mainMenu_hot_button');
            loginButton = document.getElementById('mainMenu_login_button');
            cbLocalizeView();
        }

        // Lokalisierung der Button-Labels
        function cbLocalizeView() {

            var language = ideaWatcher.core.Localizer.getLanguage();

            for (var i = 0; i < htmlMainMenuButtons.length; i++) {

                var mainMenuButton = htmlMainMenuButtons[i];
                var buttonId = mainMenuButton.getAttribute('data-button-id');
                mainMenuButton.textContent = ideaWatcher.core.Localizer
                    .MainMenu[language].ButtonLabel[buttonId];
            }
        }

        function cbLoginSuccessful(obj) {
            isLoginSuccessful = true;
            switchUserDropdown();
            clickHotButton();
        }

        function cbLogoutSuccessful(obj) {
            isLoginSuccessful = false;
            switchUserDropdown();
            clickLoginButton();
        }

        function cbWebSocketConnectionOpen(obj) {
            console.log('Klicke den Hot-Button');
            clickHotButton();
        }

        function cbCurrentClickedListType() {
            return currentClickedListType;
        }

        function cbCurrentClickedCategory() {
            return currentClickedCategory;
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

            currentClickedListType = clickEvent.target.getAttribute('data-button-id');
            lastClickedNoSearchListType = currentClickedListType;
            handleCurrentButtonClick(clickEvent);
            console.log('IdeaList vom Typ: "' + currentClickedListType + '" geklickt');

            currentClickedCategory = ideaWatcher.model.IdeaList.Category.NONE;
            ideaWatcher.controller.MainMenu.showIdeaList(currentClickedListType, currentClickedCategory);
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

            currentClickedCategory = clickEvent.target.getAttribute('data-button-id');
            handleCurrentButtonClick(clickEvent);
            console.log('Kategorie: "' + currentClickedCategory + '" geklickt');

            if (currentClickedListType === ideaWatcher.model.IdeaList.ListType.MYIDEAS ||
                currentClickedListType === ideaWatcher.model.IdeaList.ListType.MYFOLLOWEDIDEAS) {
                currentClickedListType = ideaWatcher.model.IdeaList.ListType.HOT;
            }

            ideaWatcher.controller.MainMenu.showIdeaList(currentClickedListType, currentClickedCategory);
        }
        //endregion

        //region User-Buttons
        function initializeUserButtons() {

            var userButtonNoLoginNodes = htmlUserDropdownNoLogin.children;

            for (var j = 0; j < userButtonNoLoginNodes.length; j++) {

                initializeNavigationButton(userButtonNoLoginNodes[j]);
            }

            var userButtonWithLoginNodes = htmlUserDropdownWithLogin.children;

            for (var j = 0; j < userButtonWithLoginNodes.length; j++) {

                var htmlElement = userButtonWithLoginNodes[j];
                var userButton = htmlElement.getElementsByTagName('div').item(0);
                var buttonId = userButton.getAttribute('data-button-id');
                var buttonType = userButton.getAttribute('data-button-type');

                if (buttonType === ideaWatcher.model.Navigation.ButtonType.IdeaList) {
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

            var searchInput = htmlView.querySelector('#mainMenu_searchIdeas_input');
            searchInput.addEventListener('input', handleSearchIdeasInput);
            htmlMainMenuButtons.push(searchInput);
        }

        function handleSearchIdeasInput(inputEvent) {

            var searchText = inputEvent.target.value;

            handleCurrentButtonClick(inputEvent);
            if (searchText && searchText !== '') {

                currentClickedListType = ideaWatcher.model.IdeaList.ListType.MYSEARCH;
                currentClickedCategory = ideaWatcher.model.IdeaList.Category.NONE;
                ideaWatcher.controller.MainMenu
                    .showIdeaList(currentClickedListType, currentClickedCategory, searchText);
            } else {

                currentClickedListType = lastClickedNoSearchListType;
                ideaWatcher.controller.MainMenu
                    .showIdeaList(currentClickedListType, currentClickedCategory);
            }

        }

        //endregion

        //region Reiner SwitchView-Button
        function initializeNavigationButton(htmlElement) {

            var button = htmlElement.getElementsByTagName('div').item(0);
            button.addEventListener('click', handleNavigationButton);
            htmlMainMenuButtons.push(button);
        }

        function handleNavigationButton(clickEvent) {

            var buttonId = clickEvent.target.getAttribute('data-button-id');
            handleCurrentButtonClick(clickEvent);
            console.log('MainMenu-Button ' + buttonId + ' geklickt');

            ideaWatcher.controller.MainMenu.switchView(buttonId);
        }
        //endregion

        //region AboutButton
        function initializeAboutButton() {

            var htmlAbout = document.querySelector('.mainMenu_about_li');
            htmlAbout.addEventListener('click', handleNavigationButton);
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

//            handleCurrentButtonClick(clickEvent);
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

        //region Background setzen bei Buttonklick
        function handleCurrentButtonClick(clickEvent) {

            var clickedButton = clickEvent.target;
            var buttonType = clickedButton.getAttribute('data-button-type');
            var buttonId = clickedButton.getAttribute('data-button-id');
            if (!lastClickedButton) {
                lastClickedButton = clickedButton;
            } else {
                lastClickedButton = currentClickedButton;
            }
            currentClickedButton = clickedButton;

            // Wenn HomeButton geklickt, dann Hot-Button klicken
            if (buttonType === ideaWatcher.model.Navigation.ButtonType.Home) {
                lastClickedButton.style.background = ''; // CSS-Eigenschaft
                clickHotButton();
                // zurücksetzen, sodass der allgemeine Hover-Button-Style
                // wieder greift
            }
            // Wenn Hot, Fresh oder Trending geklickt, dann soll dieser
            // Button markiert und extra gespeichert werden
            else if (buttonType === ideaWatcher.model.Navigation.ButtonType.IdeaList) {

                if (lastClickedMainIdeaListButton) {
                    lastClickedMainIdeaListButton.style.background = '';
                }
                lastClickedMainIdeaListButton = clickedButton;
                lastClickedButton.style.background = '';
                currentClickedButton.style.background = '#4096ee';
            }
            // Wenn Kategorie-Button geklickt, dann diesen zusätzlich zu zuletzt
            // geklickten Hot-, Fresh-, Trending-Button markieren:
            else if (buttonType === ideaWatcher.model.Navigation.ButtonType.Category) {
                lastClickedButton.style.background = '';
                lastClickedMainIdeaListButton.style.background = '#4096ee';
                currentClickedButton.style.background = '#4096ee';
            } else {
                // ansonsten Markierung vom letzten Button
                // auflösen
                lastClickedButton.style.background = '';
                lastClickedMainIdeaListButton.style.background = '';
            }
            if (buttonId === ideaWatcher.model.Navigation.ButtonId.MYIDEAS) {

                lastClickedButton.style.background = '';
                htmlProfileEditButton.style.background = '';
                htmlFollowedIdeasButton.style.background = '';
                htmlMyIdeasButton.style.background = '#4096ee';
            }
            else if (buttonId === ideaWatcher.model.Navigation.ButtonId.MYFOLLOWEDIDEAS) {

                lastClickedButton.style.background = '';
                htmlProfileEditButton.style.background = '';
                htmlFollowedIdeasButton.style.background = '#4096ee';
                htmlMyIdeasButton.style.background = '';
            }
            else if (buttonId === ideaWatcher.model.Navigation.ButtonId.MYPROFILE) {

                lastClickedButton.style.background = '';
                htmlProfileEditButton.style.background = '#4096ee';
                htmlFollowedIdeasButton.style.background = '';
                htmlMyIdeasButton.style.background = '';
            }
        }
        //endregion

        //region Hilfsfunktionen
        // Verändere Dropdown-Menü
        function switchUserDropdown() {

            if (isLoginSuccessful) {

                htmlUserDropdownNoLogin.style.display = 'none';
                htmlUserDropdownWithLogin.style.display = 'block';
            } else {

                htmlUserDropdownNoLogin.style.display = 'block';
                htmlUserDropdownWithLogin.style.display = 'none';
            }
        }

        // HotButton anklicken
        function clickHotButton() {

            hotButton.click();
        }

        // HotButton anklicken
        function clickLoginButton() {

            loginButton.click();
        }
        //endregion

        return {};

    })();