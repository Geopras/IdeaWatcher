ideaWatcher.view.MainMenu = ideaWatcher.view.MainMenu || (function UICMainMenu() {

    //region local vars
    // Event Globale Initialisierung
    var evIni = {
        topic: 'internal/ini',
        cbFunction: cbiIni
    };
    var htmlView;
    var htmlBtnHot;
    var htmlBtnTrending;
    var htmlBtnLogin;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evIni);
    //endregion

    function cbiIni() {
        console.log('ini Event');
        htmlView = document.querySelector('.v-profileEdit-view');
        htmlBtnHot = document.querySelector('.js-mainMenu-btnHome');
        htmlBtnLogin = document.querySelector('.js-mainMenu-btnLogin');
        htmlBtnHot.addEventListener('click',handleButtonNavigation);
        htmlBtnLogin.addEventListener('click',handleButtonNavigationLogin);
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

        // muss dann in die entsprechende View ausgelagert werden, nur für testzwecke
        htmlView.style.display = 'none';
        document.querySelector('.v-signUp-view').style.display = 'none';

        ideaWatcher.core.Navigator.switchView({
            viewId: 'login',
            url: 'myLogin'
        });

    }

    return {

    };

})();