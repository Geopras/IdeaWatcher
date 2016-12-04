ideaWatcher.controller.UserSession = ideaWatcher.controller.UserSession || (function () {

        // var cbVerificationError = null;
        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbLoginRes = null;
        var cbLogoutRes = null;

        var currentUserId = null;
        var isUserLoggedInFlag = false;

        //region Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evSwitchView = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.LOGIN,
            cbFunction: cbSwitchView
        };

        var evLocalizeView = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.LOGIN,
            cbFunction: cbLocalizeView
        };

        var evLoginResponse = {
            topic: 'SLogin/loginRequest-response',
            cbFunction: cbLoginResponse
        };

        var evLogoutResponse = {
            topic: 'SLogout/logoutRequest-response',
            cbFunction: cbLogoutResponse
        };
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evLoginResponse);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evLogoutResponse);
        //endregion

        //region event callbacks
        function cbInitializeView(obj) {
            cbInitView();
        }

        function cbSwitchView(obj)
        {
            // if(obj.shouldShow) wam.logic.Header.showHeader(false);
            cbShowView({
                shouldShow: obj.shouldShow
            });
        }

        function cbLocalizeView(obj) {
            cbLocalize();
        }

        function cbLoginResponse(obj) {

            if (obj.result === 'valid') {
                currentUserId = obj.userId;
                isUserLoggedInFlag = true;
            } else {
                currentUserId = null;
                isUserLoggedInFlag = false;
            }

            cbLoginRes(obj);
        }

        function cbLogoutResponse(obj) {

            if (obj.result === 'success') {
                currentUserId = null;
                isUserLoggedInFlag = false;
            }

            cbLogoutRes(obj);
        }
        //endregion

        //region Registrierung von Callbackmethoden

        function pubRegisterInitView(cb) {
            cbInitView = cb;
        }

        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }

        function pubRegisterLocalizeView(cb) {
            cbLocalize = cb;
        }

        function pubRegisterResponseLogin(cb) {
            cbLoginRes = cb;
        }

        function pubRegisterResponseLogout(cb) {
            cbLogoutRes = cb;
        }

        //endregion

        //region Für andere Controller angebotene Schnittstellen
        function pubTryToLogin(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLogin(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function pubTryToLogout()
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLogout());
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }
        //endregion

        //region build: RequestLogin
        function buildRequestLogin(exObject)
        {
            var exLoginRequest = ideaWatcher.model.Request;

            exLoginRequest.destination = 'SLogin/loginRequest';
            exLoginRequest.data = exObject;

            return exLoginRequest;
        }
        //endregion

        //region build: RequestLogout
        function buildRequestLogout()
        {
            var request = ideaWatcher.model.Request;

            request.destination = 'SLogout/logoutRequest';
            request.data = {};

            return request;
        }
        //endregion

        //region Für interne uiConnectors angebotene Schnittstellen
        function pubLoginSuccessful() {

            var evObject = {
                topic: 'SLogin/loginSuccessful',
                exObject: null
            };
            ideaWatcher.core.MessageBroker.publish(evObject);
        }

        function pubLogoutSuccessful() {

            var evObject = {
                topic: 'SLogout/logoutSuccessful',
                exObject: null
            };
            ideaWatcher.core.MessageBroker.publish(evObject);
        }

        //endregion

        function pubIsUserLoggedIn() {
            return isUserLoggedInFlag;
        }

        function pubGetCurrentUserId() {
            return currentUserId;
        }

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {

            publishLoginSuccessful: pubLoginSuccessful,
            publishLogoutSuccessful: pubLogoutSuccessful,
            registerInitializeView: pubRegisterInitView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerLoginResponse: pubRegisterResponseLogin,
            registerLogoutResponse: pubRegisterResponseLogout,
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            registerShowView: pubRegisterShowView,
            // stellt die Öffentliche Schnittstelle dar, mit der die View
            // dem Controller sagen kann,
            // dass der Benutzer den Button gedrückt hat und jetzt die UserSession-Credential an das Backend
            //geschickt werden sollen, um den Benutzer zu validieren
            tryToLogin: pubTryToLogin,
            tryToLogout: pubTryToLogout,
            isUserLoggedIn: pubIsUserLoggedIn,
            getCurrentUserId: pubGetCurrentUserId
        };

    })();