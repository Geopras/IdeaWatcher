ideaWatcher.controller.Login = ideaWatcher.controller.Login || (function () {

    //region local vars
    var WS_URL = 'ws://127.0.0.1:8080/IdeaWatcher/wsEndpoint';
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
        // BN+PW zwischenspeichern, wird von buildRequestLogin() Methode an 2 Stellen Benötigt
        userName = exObject.userName;
        password = exObject.password;

        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLogin());
        }
        else {
            // Versuche eine Verbindung zum Backend aufzubauen
            ideaWatcher.core.WebSocketConnector.connectToServer(WS_URL, cbConnectionEstablished);
        }
    }
    //endregion

    //region build: RequestLogin
    function buildRequestLogin()
    {
        // das könnte man in das Model auslagern... sinnvoll?
        var exLoginRequest = ideaWatcher.model.Request;
        exLoginRequest.destination = 'SLogin/validateRequest';
        exLoginRequest.data = {
            userName: userName,
            password: password,
        };
        exLoginRequest.token = '-1';

        return exLoginRequest;
    }
    //endregion

    //region Callback: connection established
    function cbConnectionEstablished(isConnected,errorObject)
    {
        if (isConnected) {
            // Wenn die Verbindung erfolgreich hergestellt wurde, wird der Request an das Backend geschickt
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLogin());
        }
        else {
            // Verbindung konnte nicht hergestellt werden, nochmal versuchen?
            // oder gleich der Error anzeigen? in eigener Komponente?
            console.log('Verbindungsaufbau gescheitert');
            console.log(errorObject);
        }
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