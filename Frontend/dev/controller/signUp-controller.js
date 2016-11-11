ideaWatcher.controller.Signup = ideaWatcher.controller.Signup || (function () {

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
        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestSignup(exObject));
        } else {
            // TODO: Was soll passieren, wenn keine Verbindung gerade
            // TODO: existiert? Fehlermeldung?
        }
    }
    //endregion

    //region build: RequestSignup
    function buildRequestSignup(exObject)
    {
        var exSignupRequest = ideaWatcher.model.Request;

        exSignupRequest.destination = 'SSignup/signupRequest';
        exSignupRequest.data = exObject;

        return exSignupRequest;
    }
    //endregion

    //TODO: Brauchen wir wirklich diese Callbackfunction??!!
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