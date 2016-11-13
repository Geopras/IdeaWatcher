ideaWatcher.controller.HotIdeaList = ideaWatcher.controller.HotIdeaList || (function () {


    //region local vars
    var cbShowView = null;
    var cbRenderList = null;
    var evSwitchView = {
        topic: 'switchView/HotIdeaList',
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

    //region Callback: Internal - SwitchView
    function cbSwitchView(obj)
    {
        // if(obj.shouldShow) {
        // 	ideaWatcher.services.WebSocketConnector.sendRequest(buildRequestIdeaListUser('plötzlich auftauchende UserID'));
        // }
        cbShowView({
            shouldShow: obj.shouldShow
        });
    }
    //endregion

    //zeigt eigene Ideen des Nutzers im Profil an
    function buildRequestIdeaListUser(userId)
    {
        // das könnte man in das Model auslagern... sinnvoll?
        var exIdeaListRequest = {
            destination: 'SIdeaData/listUserRequest',
            userId: userId
        };

        return exIdeaListRequest;
    }
    //region register Callbacks
    // function pubRegisterVerificationError(cb) {
    //     cbVerificationError = cb;
    // }

    function pubRegisterShowView(cb) {
        cbShowView = cb;
       
    }
    
    function pubRegisterRenderList(cb) {
        cbRenderList = cb;
       
    }
    //endregion

    // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
    return {
        // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
        // wenn die View ein/ausgeblendet werden soll
        registerShowView: pubRegisterShowView,
        registerRenderList: pubRegisterRenderList
    };

})();