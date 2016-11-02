ideaWatcher.controller.IdeaList = ideaWatcher.controller.IdeaList || (function CIdeaList() {

    //region local vars
    var cbShowView = null;
    var evSwitchView = {
        topic: 'switchView/ideaList',
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
        registerShowView: pubRegisterShowView
    };

})();