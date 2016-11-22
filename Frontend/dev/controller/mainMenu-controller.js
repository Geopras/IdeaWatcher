ideaWatcher.controller.Navigation = ideaWatcher.controller.Navigation || (function () {

        var cbInitView = null;
        var cbLocalize = null;
        var cbLoginSuccess = null;
        var cbLogoutSuccess = null;

        //region Events Initialisieren
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evLocalizeView = {
            topic: 'localizeView/mainMenu',
            cbFunction: cbLocalizeView
        };

        var evLoginSuccessful = {
            topic: 'SLogin/loginSuccessful',
            cbFunction: cbLoginSuccessful
        };

        var evLogoutSuccessful = {
            topic: 'SLogout/logoutSuccessful',
            cbFunction: cbLogoutSuccessful
        };
        //endregion

        //region Events am Messagebroker anmelden
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evLoginSuccessful);
        ideaWatcher.core.MessageBroker.subscribe(evLogoutSuccessful);
        //endregion

        //region Callback-Functions für MessageBroker

        function cbInitializeView(obj) {
            cbInitView();
        }

        function cbLocalizeView(obj) {
            cbLocalize();
        }

        function cbLoginSuccessful(obj) {
            cbLoginSuccess(obj);
        }

        function cbLogoutSuccessful(obj) {
            cbLogoutSuccess(obj);
        }
        //endregion

        //region Registrierung der internen (von uiConnectoren) Callbacks
        function pubRegisterInitializeView(cb) {
            cbInitView = cb;
        }

        function pubRegisterLocalizeView(cb) {
            cbLocalize = cb;
        }

        function pubRegisterLoginSuccessful(cb) {
            cbLoginSuccess = cb;
        }

        function pubRegisterLogoutSuccessful(cb) {
            cbLogoutSuccess = cb;
        }
        //endregion

        //region Nach außen angebotene Methoden
        function pubLogout() {
            ideaWatcher.controller.UserSession.tryToLogout();
        }
        //endregion

        return {

            logoutUser: pubLogout,
            registerInitializeView: pubRegisterInitializeView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerLoginSuccessful: pubRegisterLoginSuccessful,
            registerLogoutSuccessful: pubRegisterLogoutSuccessful
        };

    })();

