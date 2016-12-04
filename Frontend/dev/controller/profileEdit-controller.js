ideaWatcher.controller.ProfileEdit = ideaWatcher.controller.ProfileEdit || (function () {

        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbSaveResp = null;
        var cbGetUserDataResp = null;

        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evSwitchView = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.MYPROFILE,
            cbFunction: cbSwitchView
        };

        var evLocalizeView = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.MYPROFILE,
            cbFunction: cbLocalizeView
        };

        var evSaveResponse = {
            topic: 'SProfileEdit/validateAndSaveRequest-response',
            cbFunction: cbSaveResponse
        };

        var evGetUserDataResponse = {
            topic: 'SProfileEdit/getUserDataRequest-response',
            cbFunction: cbGetUserDataResponse
        };

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evSaveResponse);
        ideaWatcher.core.MessageBroker.subscribe(evGetUserDataResponse);
        //endregion

        //region Callback-Functions
        function cbInitializeView(obj) {

            cbInitView();
        }

        function cbSwitchView(obj) {

            cbShowView(obj);
        }

        function cbLocalizeView(obj) {

            cbLocalize();
        }

        function cbSaveResponse(obj) {

            cbSaveResp(obj);
        }

        function cbGetUserDataResponse(obj) {

            cbGetUserDataResp(obj);
        }


        //endregion

        //region register Callbacks
        function pubRegisterInitView(cb) {

            cbInitView = cb;
        }

        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }

        function pubRegisterLocalize(cb) {

            cbLocalize = cb;
        }

        function pubRegisterSaveResponse(cb) {

            cbSaveResp = cb;
        }

        function pubRegisterGetUserDataResponse(cb) {

            cbGetUserDataResp = cb;
        }
        //endregion

        //region TryToSaveUserData
        function pubTryToSaveUserData(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestSaveUserData(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }
        //endregion

        //region build: RequestSaveUserData
        function buildRequestSaveUserData(exObject)
        {
            var exSaveUserDataRequest = ideaWatcher.model.Request;

            exSaveUserDataRequest.destination = 'SProfileEdit/validateAndSaveRequest';
            exSaveUserDataRequest.data = exObject;

            return exSaveUserDataRequest;
        }
        //endregion

        //region TryToLoadUserDate
        function pubTryToLoadUserData(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLoadUserData(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }
        //endregion

        //region build: RequestLoadUserData
        function buildRequestLoadUserData(exObject)
        {
            var exLoadUserDataRequest = ideaWatcher.model.Request;

            exLoadUserDataRequest.destination = 'SProfileEdit/getUserDataRequest';
            exLoadUserDataRequest.data = exObject;

            return exLoadUserDataRequest;
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            registerGetUserDataResponse: pubRegisterGetUserDataResponse,
            registerInitializeView: pubRegisterInitView,
            registerLocalizeView: pubRegisterLocalize,
            registerSaveResponse: pubRegisterSaveResponse,
            // wenn die View ein/ausgeblendet werden soll
            registerShowView: pubRegisterShowView,
            // stellt die Öffentliche Schnittstelle dar, mit der die View dem Controler sagen kann,
            // dass der Benutzer den Submit-Button gedrückt hat und jetzt seine User-Daten an das
            // Backend geschickt werden sollen, um sie zu validieren und bei Erfolg zu speichern
            tryToSaveUserData: pubTryToSaveUserData,
            // hier kann die View dem Controller sagen, dass sie gerne die Daten des Benutzers laden
            // und anzeigen möchte
            tryToLoadUserData: pubTryToLoadUserData
        };

    })();
