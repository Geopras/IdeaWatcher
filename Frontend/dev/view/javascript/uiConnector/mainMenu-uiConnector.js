ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu || (function () {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbiIni
    };
    var htmlView;
    var htmlHotButton;
    var htmlLoginButton;
    var htmlUserButton;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    function cbiIni() {
        console.log('ini Event');
        htmlView = document.querySelector('.mainMenu_view');
        htmlHotButton = document.querySelector('.mainMenu_hot_button');
        htmlLoginButton = document.querySelector('.mainMenu_login_button');
        htmlUserButton = document.querySelector('.mainMenu_user_button');
        htmlHotButton.addEventListener('click', handleButtonNavigation);
        htmlLoginButton.addEventListener('click', handleButtonNavigationLogin);
        htmlUserButton.addEventListener('click', handleButtonNavigationProfile);
    }

    function handleButtonNavigation(clickEvent){

        console.log('htmlBtnHome geklickt');
        ideaWatcher.core.Navigator.switchView({
            viewId: 'mainView',
            url: 'myMainView'
        });
    }

    function handleButtonNavigationLogin(clickEvent){

        console.log('htmlBtnLogin geklickt');

        document.querySelector('.signUp_view').style.display = 'none';

        ideaWatcher.core.Navigator.switchView({
            viewId: 'login',
            url: 'myLogin'
        });

    }

        function handleButtonNavigationProfile(clickEvent){

            console.log('htmlUserButton geklickt');
            ideaWatcher.core.Navigator.switchView({
                viewId: 'profile',
                url: 'myProfile'
            });
        }

    return {

    };

})();