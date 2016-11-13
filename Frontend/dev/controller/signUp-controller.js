ideaWatcher.controller.Signup = ideaWatcher.controller.Signup || (function () {

    var userName = null;
    var email = null;
    var password = null;
    var cbShowView = null;
    var evSwitchView = {
        topic: 'switchView/signup',
        cbFunction: cbSwitchView
    };
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
    //endregion

    //region TryToSignup
    function pubTryToSignup(exObject)
    {
        // BN+PW zwischenspeichern, wird von buildRequestLogin() Methode an 2 Stellen Benötigt
        userName = exObject.userName;
        email = exObject.email;
        password = exObject.password;

        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestSignup());
        }
        else {
            // Versuche eine Verbindung zum Backend aufzubauen
            // ideaWatcher.core.WebSocketConnector.connectToServer(WS_URL, cbConnectionEstablished);
        }
    }
    //endregion

    //region build: RequestSignup
    function buildRequestSignup()
    {
        // das könnte man in das Model auslagern... sinnvoll?
        var exSignupRequest = ideaWatcher.model.Request;
        exSignupRequest.destination = 'SSignup/signupRequest';
        exSignupRequest.data = {
            userName: userName,
            email: email,
            password: password
        };

        return exSignupRequest;
    }
    //endregion

    //region Callback: connection established
    function cbConnectionEstablished(isConnected,errorObject)
    {
        if (isConnected) {
            // Wenn die Verbindung erfolgreich hergestellt wurde, wird der Request an das Backend geschickt
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestSignup());
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
        tryToSignup: pubTryToSignup
    };

})();