ideaWatcher.controller.MainMenu = ideaWatcher.controller.MainMenu || (function () {

        var cbInitView = null;
        var cbLocalize = null;
        var cbLoginSuccess = null;
        var cbLogoutSuccess = null;
        var cbGetCurrentClickedCategory = null;
        var cbGetCurrentClickedListType = null;
        var cbWebSocketConnOpen = null;
        var cbSearchIdeasResp = null;

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

        var evSearchIdeasResponse = {
            topic: 'SSearch/searchIdeasRequest-response',
            cbFunction: cbSearchIdeasResponse
        };
        //endregion

        //region Events am Messagebroker anmelden
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evLoginSuccessful);
        ideaWatcher.core.MessageBroker.subscribe(evLogoutSuccessful);
        ideaWatcher.core.MessageBroker.subscribe(evWebSocketConnectionOpen);
        ideaWatcher.core.MessageBroker.subscribe(evSearchIdeasResponse);
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

        function cbSearchIdeasResponse(obj) {
            cbSearchIdeasResp(obj);
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

        function pubRegisterSearchIdeasResponse(cb) {
            cbSearchIdeasResp = cb;
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

        function pubTryToSearchIdeas(searchText) {

            var request = ideaWatcher.model.Request;
            request.destination = 'SSearch/searchIdeasRequest';
            request.data = {
                searchText: searchText
            };

            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(request);
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function pubShowIdeaList(listType, category, searchText) {

            if (searchText && searchText !== '') {

                ideaWatcher.controller.IdeaList.updateIdeaList(listType, category, 1, 10, true, searchText);
            } else {

                ideaWatcher.controller.IdeaList.updateIdeaList(listType, category, 1, 10, true);
            }
        }

        function pubSwitchView(buttonId, addData) {

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId[buttonId];
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl[buttonId];
            if (addData) {
                exObj.additionalData = addData;
            }
            ideaWatcher.core.Navigator.switchView(exObj);
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
            registerSearchIdeasResponse: pubRegisterSearchIdeasResponse,
            registerWebSocketConnectionOpen: pubRegisterWebSocketConnectionOpen,
            showIdeaList: pubShowIdeaList,
            switchView: pubSwitchView,
            tryToSearchIdeas: pubTryToSearchIdeas
        };

    })();

