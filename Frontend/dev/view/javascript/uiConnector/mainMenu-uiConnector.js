ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu
    || (function () {

        // region local vars
        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbiIni
        };

        var evLocalizeView = {
            topic: 'localizeView/mainMenu',
            cbFunction: localizeView
        };

        var htmlView;
        var htmlHomeButton;
        var htmlHotButton;
        var htmlFreshButton;
        var htmlTrendingButton;
        var htmlLoginButton;
        var htmlSignupButton;
        var htmlLanguageSwitchCheckbox;
        var htmlUserButton;
        var htmlCategoryParentNode;
        var htmlCategoryChildrenList;
        // endregion

        // region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        // endregion

        function cbiIni() {
            console.log('ini Event');
            htmlView = document.querySelector('.mainMenu_view');
            htmlHomeButton = document
                .querySelector('.mainMenu_logo_button');
            htmlHotButton = document.querySelector('.mainMenu_hot_button');
            htmlFreshButton = document
                .querySelector('.mainMenu_fresh_button');
            htmlTrendingButton = document
                .querySelector('.mainMenu_trending_button');
            htmlLoginButton = document
                .querySelector('#mainMenu_login_button');
            htmlSignupButton = document
                .querySelector('#mainMenu_signup_button');
            htmlUserButton = document
                .querySelector('.mainMenu_user_button');
            htmlCategoryParentNode = document
                .querySelector('.mainMenu_categoryList_ul');
            htmlLanguageSwitchCheckbox = document
                .querySelector('.mainMenu_switch');

            htmlHomeButton
                .addEventListener('click', handleButtonNavigation);
            htmlHotButton.addEventListener('click',
                handleButtonNavigationHot);
            htmlFreshButton.addEventListener('click',
                handleButtonNavigationFresh);
            htmlTrendingButton.addEventListener('click',
                handleButtonNavigationTrending);
            htmlLoginButton.addEventListener('click',
                handleButtonNavigationLogin);
            htmlSignupButton.addEventListener('click',
                handleButtonNavigationSignup);
            //htmlUserButton.addEventListener('click',
            //	handleButtonNavigationProfile);
            htmlLanguageSwitchCheckbox.addEventListener('change',
                handleCheckboxLanguageSwitch); // bei "click" wird die
            // Methode gleich
            // zweimal aufgerufen

            htmlCategoryChildrenList = htmlCategoryParentNode.children;

            for (var i = 0; i < htmlCategoryChildrenList.length; i++) {
                htmlCategoryChildrenList[i].addEventListener('click',
                    handleButtonNavigationCategory);
            }

            localizeView();
        }

        function handleButtonNavigation(clickEvent) {

            console.log('htmlBtnHome geklickt');
            ideaWatcher.core.Navigator.switchView({
                viewId: 'IdeaList',
                url: 'ideaWatcher.html'
            });
        }

        function handleButtonNavigationLogin(clickEvent) {

            console.log('htmlBtnLogin geklickt');

            ideaWatcher.core.Navigator.switchView({
                viewId: 'Login',
                url: 'myLogin'
            });

        }

        function handleButtonNavigationSignup(clickEvent) {

            console.log('htmlBtnSignup geklickt');

            ideaWatcher.core.Navigator.switchView({
                viewId: 'Signup',
                url: 'mySignUp'
            });

        }

        function handleButtonNavigationProfile(clickEvent) {

            console.log('htmlUserButton geklickt');
            ideaWatcher.core.Navigator.switchView({
                viewId: 'Profile',
                url: 'myProfile',
            });
        }

        function handleButtonNavigationHot(clickEvent) {

            console.log('htmlHotButton geklickt');

            var exObj = {
                ideaListType: 'HOT',
                fromRank: '1',
                toRank: '10'
            };
            console.log(exObj);

            ideaWatcher.controller.IdeaList.getIdeaList(exObj);
        }

        function handleButtonNavigationFresh(clickEvent) {

            console.log('htmlFreshButton geklickt');

            var exObj = {
                ideaListType: 'FRESH',
                fromRank: '1',
                toRank: '10'
            };
            console.log(exObj);

            ideaWatcher.controller.IdeaList.getIdeaList(exObj);
        }

        function handleButtonNavigationTrending(clickEvent) {

            console.log('htmlTrendingButton geklickt');

            var exObj = {
                ideaListType: 'TRENDING',
                fromRank: '1',
                toRank: '10'
            };
            console.log(exObj);

            ideaWatcher.controller.IdeaList.getIdeaList(exObj);
        }

        function handleButtonNavigationCategory(clickEvent) {

            console.log('htmlCategoryButton geklickt');
            var source = clickEvent.srcElement || clickEvent.target;
            ideaWatcher.core.Navigator.switchView({
                viewId: 'CategoryIdeaList',
                url: 'CategoryIdeaList',
                additionalData: {
                    categoryName: source.textContent
                }
            });
        }

        function handleCheckboxLanguageSwitch(clickEvent) {
            var language = ideaWatcher.core.Localizer.getLanguage();
            if (language == 'de_DE') {
                language = ideaWatcher.core.Localizer.setLanguage('en_GB');
            } else {

                language = ideaWatcher.core.Localizer.setLanguage('de_DE');
            }
            ideaWatcher.core.Localizer.localzeCurrentViews();
        }

        function localizeView() {
        	var language = ideaWatcher.core.Localizer.getLanguage();
             htmlHotButton.textContent = ideaWatcher.core.Localizer.mainMenu[language].hotButtonLabel;
             htmlTrendingButton.textContent = ideaWatcher.core.Localizer.mainMenu[language].trendingButtonLabel;
             htmlFreshButton.textContent = ideaWatcher.core.Localizer.mainMenu[language].freshButtonLabel;
             
             var htmlCategoryHeader = document.querySelector('#categoryHeader');
             var htmlCategoryBusiness = document.querySelector('#mainMenu_businessCategory_label');
             var htmlCategoryComputer = document.querySelector('#mainMenu_computerCategory_label');
             var htmlCategoryGadet = document.querySelector('#mainMenu_gadgetCategory_label');
             var htmlCategoryHome = document.querySelector('#mainMenu_homeCategory_label');
             var htmlCategorySports = document.querySelector('#mainMenu_sportsCategory_label');
             var htmlCategoryToys = document.querySelector('#mainMenu_toysCategory_label');
             var htmlCategoryOther = document.querySelector('#mainMenu_otherCategory_label');
             
             htmlCategoryHeader.textContent = ideaWatcher.core.Localizer.mainMenu[language].categoriesButtonLabel;
             htmlCategoryBusiness.textContent = ideaWatcher.core.Localizer.mainMenu[language].business;
             htmlCategoryComputer.textContent = ideaWatcher.core.Localizer.mainMenu[language].computer;
             htmlCategoryGadet.textContent = ideaWatcher.core.Localizer.mainMenu[language].gadet;
             htmlCategoryHome.textContent = ideaWatcher.core.Localizer.mainMenu[language].homeAndGarden;
             htmlCategorySports.textContent = ideaWatcher.core.Localizer.mainMenu[language].sports;
             htmlCategoryToys.textContent = ideaWatcher.core.Localizer.mainMenu[language].toys;
             htmlCategoryOther.textContent = ideaWatcher.core.Localizer.mainMenu[language].other;
             
             htmlLoginButton.textContent = ideaWatcher.core.Localizer.mainMenu[language].loginButtonLabel;
             htmlSignupButton.textContent = ideaWatcher.core.Localizer.mainMenu[language].signupButtonLabel;
        }

        return {};

    })();