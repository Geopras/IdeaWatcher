ideaWatcher.controller.ProfileEdit = ideaWatcher.controller.ProfileEdit || (function CProfileEdit() {

        var cbShowView = null;
        var evSwitchView = {
            topic: 'switchView/profileEdit',
            cbFunction: cbSwitchView
        };

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
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

        //region Callback: Internal - SwitchView
        function cbSwitchView(obj)
        {
            cbShowView({
                shouldShow: obj.shouldShow
            });
        }
        //endregion

        //region register Callbacks
        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
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
