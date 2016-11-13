ideaWatcher.controller.Login = ideaWatcher.controller.Login || (function () {

    //region local vars
    var userName = null;
    var password = null;
    // var cbVerificationError = null;
    var cbShowView = null;
    var evSwitchView = {
        topic: 'switchView/login',
        cbFunction: cbSwitchView
    };
    // var evIni = Object.create(wam.services.events.Ini);
    // evIni.cbFunction = cbIni;
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
    // wtk.MessageBroker.subscribe(evIni);
    // wtk.connection.ResponseHandler.subscribe('SLogin/Response', sCBLoginResponse);
    //endregion

    //region TryToLogin
    function pubTryToLogin(exObject)
    {
        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLogin(exObject));
        } else {
            //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
        }
    }
    //endregion

    //region build: RequestLogin
    function buildRequestLogin(exObject)
    {
        var exLoginRequest = ideaWatcher.model.Request;

        exLoginRequest.destination = 'SLogin/validateRequest';
        exLoginRequest.data = exObject;

        return exLoginRequest;
    }
    //endregion

    //region Callback: Internal - SwitchView
    function cbSwitchView(obj)
    {
        // if(obj.shouldShow) wam.logic.Header.showHeader(false);
        cbShowView({
            shouldShow: obj.shouldShow
        });
    }
    //endregion

    //region register Callbacks
    // function pubRegisterVerificationError(cb) {
    //     cbVerificationError = cb;
    // }
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
        // dass der Benutzer den Button gedrückt hat und jetzt die Login-Credential an das Backend
        //geschickt werden sollen, um den Benutzer zu validieren
        tryToLogin: pubTryToLogin
    };

})();