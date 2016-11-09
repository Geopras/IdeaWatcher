ideaWatcher.controller.CategoryIdeaList = ideaWatcher.controller.CategoryIdeaList || (function CCategoryIdeaList() {


    //region local vars
    var cbShowView = null;
    var cbRenderList = null;
    var evSwitchView = {
        topic: 'switchView/CategoryIdeaList',
        cbFunction: cbSwitchView
    };
    // var evIni = Object.create(wam.core.events.Ini);
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
        // 	ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestIdeaListUser('plötzlich auftauchende UserID'));
        // }
    	
    	console.log(obj.additionalData);
        cbShowView({
            shouldShow: obj.shouldShow,
            additionalData : obj.additionalData
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