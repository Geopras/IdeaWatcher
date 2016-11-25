ideaWatcher.controller.MainMenu = ideaWatcher.controller.MainMenu || (function () {

        var cbInitView = null;
        var cbLocalize = null;
        var cbLoginSuccess = null;
        var cbLogoutSuccess = null;
        var cbGetCurrentClickedCategory = null;
        var cbGetCurrentClickedListType = null;
        var cbWebSocketConnOpen = null;

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

        var evWebSocketConnectionOpen = {
            topic: 'SWebSocket/connectionOpen',
            cbFunction: cbWebSocketConnectionOpen
        };
        //endregion

        //region Events am Messagebroker anmelden
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evLoginSuccessful);
        ideaWatcher.core.MessageBroker.subscribe(evLogoutSuccessful);
        ideaWatcher.core.MessageBroker.subscribe(evWebSocketConnectionOpen);
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

        function cbWebSocketConnectionOpen(obj) {
            cbWebSocketConnOpen(obj);
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

        function pubRegisterWebSocketConnectionOpen(cb) {
            cbWebSocketConnOpen = cb;
        }

        function pubRegisterGetCurrentClickedCategory(cb) {
            cbGetCurrentClickedCategory = cb;
        }

        function pubRegisterGetCurrentClickedListType(cb) {
            cbGetCurrentClickedListType = cb;
        }
        //endregion

        //region Nach außen angebotene Methoden
        function pubLogout() {
            ideaWatcher.controller.UserSession.tryToLogout();
        }

        function pubGetCurrentClickedCategory() {
            return cbGetCurrentClickedCategory();
        }

        function pubGetCurrentClickedListType() {
            return cbGetCurrentClickedListType();
        }

        //endregion

        return {

            getCurrentClickedCategory: pubGetCurrentClickedCategory,
            getCurrentClickedListType: pubGetCurrentClickedListType,
            logoutUser: pubLogout,
            registerGetCurrentClickedCategory: pubRegisterGetCurrentClickedCategory,
            registerGetCurrentClickedListType: pubRegisterGetCurrentClickedListType,
            registerInitializeView: pubRegisterInitializeView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerLoginSuccessful: pubRegisterLoginSuccessful,
            registerLogoutSuccessful: pubRegisterLogoutSuccessful,
            registerWebSocketConnectionOpen: pubRegisterWebSocketConnectionOpen
        };

    })();

