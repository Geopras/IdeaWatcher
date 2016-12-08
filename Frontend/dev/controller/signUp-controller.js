ideaWatcher.controller.Signup = ideaWatcher.controller.Signup || (function () {

    var userName = null;
    var email = null;
    var password = null;
    var cbShowView = null;
    var evSwitchView = {
        topic: 'switchView/signup',
        cbFunction: cbSwitchView
    };
    var evGetRegistrationResponse = {
        topic: 'SSignup/addUserRequest-response',
        cbFunction: cbRegistrationResponse
    };
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
    ideaWatcher.core.MessageBroker.subscribe(evGetRegistrationResponse);
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
        exSignupRequest.destination = 'SSignup/addUserRequest';
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

    //region Callback: RegistrationResponse
    function cbRegistrationResponse(exObj){
        var currentLanguage = ideaWatcher.core.Localizer.getLanguage();

        var displayTextRegistration = ideaWatcher.core.Localizer.signUp[currentLanguage].registration;
        var displayTextError = 'default';

        if(exObj.result === 'ok') {

            ideaWatcher.controller.GlobalNotification.showNotification(
                ideaWatcher.model.GlobalNotificationType.SUCCESS,
                displayTextRegistration,
                ideaWatcher.core.Localizer.signUp[currentLanguage].signup_SUCCESS,
                4000);

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId.LOGIN;
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.LOGIN;

            ideaWatcher.core.Navigator.switchView(exObj);
        }
        else {
            displayTextError = ideaWatcher.core.Localizer.signUp[currentLanguage].signup_ERROR[exObj.error];

            ideaWatcher.controller.GlobalNotification.showNotification(
            ideaWatcher.model.GlobalNotificationType.ERROR,
            displayTextRegistration,
            displayTextError,
            4000);
        }
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
        // dass der Benutzer den Button gedrückt hat und jetzt die UserSession-Credential an das Backend
        //geschickt werden sollen, um den Benutzer zu validieren
        tryToSignup: pubTryToSignup
    };

})();