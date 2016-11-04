ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu || (function UICMainMenu() {

    //region lokale Variablen
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbiIni
    };
    var htmlView;
    var htmlHomeButton;
    var htmlHotButton;
    var htmlFreshButton;
    var htmlTrendingButton;
    var htmlCategoriesButton;
    var htmlSearchButton;
    var htmlProfileButton;
    var htmlLoginButton;

    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    function cbiIni() {
        console.log('ini Event');
        htmlView = document.querySelector('.mainMenu_view');
        htmlHomeButton = document.getElementById('mainMenu_logo_image');
        htmlHotButton = document.getElementById('mainMenu_hot_button');
        htmlFreshButton = document.getElementById('mainMenu_fresh_button');
        htmlTrendingButton = document.getElementById('mainMenu_trending_button');
        htmlCategoriesButton = document.getElementById('mainMenu_categories_button');
        htmlSearchButton = document.getElementById('mainMenu_search_button');
        htmlProfileButton = document.getElementById('mainMenu_profile_button');
        htmlLoginButton = document.getElementById('mainMenu_login_button');
        htmlHotButton.addEventListener('click',handleButtonNavigation);
        htmlLoginButton.addEventListener('click',handleButtonNavigationLogin);
    }

    function handleButtonNavigation(clickEvent){

        console.log('htmlHomeButton geklickt');
        ideaWatcher.core.Navigator.switchView({
            viewId: 'mainView',
            url: 'myMainView'
        });
    }

    function handleButtonNavigationLogin(clickEvent){

        console.log('htmlLoginButton geklickt');

        // muss dann in die entsprechende View ausgelagert werden, nur für testzwecke
        htmlView.style.display = 'none';
        document.querySelector('.signUp_view').style.display = 'none';
        document.querySelector('.mainMenu_view').style.display = 'none';

        ideaWatcher.core.Navigator.switchView({
            viewId: 'login',
            url: 'myLogin'
        });

    }

    return {

    };

})();