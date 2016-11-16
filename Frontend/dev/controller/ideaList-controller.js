ideaWatcher.controller.IdeaList = ideaWatcher.controller.IdeaList || (function () {


        //region local vars
        var cbShowView = null;
        var cbRenderList = null;
        var evSwitchViewHot = {
            topic: 'switchView/IdeaList',
            cbFunction: cbSwitchView
        };

        // var evIni = Object.create(wam.services.events.Ini);
        // evIni.cbFunction = cbIni;
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewHot);
        // ideaWatcher.core.MessageBroker.subscribe(evSwitchViewFresh);
        // ideaWatcher.core.MessageBroker.subscribe(evSwitchViewTrending);
        // wtk.MessageBroker.subscribe(evIni);
        // wtk.connection.ResponseHandler.subscribe('SLogin/Response', sCBLoginResponse);
        //endregion

        //region Callback: Internal - SwitchViewHot
        function cbSwitchView(obj)
        {
            // if(obj.shouldShow) {
            // 	ideaWatcher.services.WebSocketConnector.sendRequest(buildRequestIdeaListUser('plötzlich auftauchende UserID'));
            // }
            cbShowView({
                shouldShow: obj.shouldShow,
                ideaListType: obj.additionalData.ideaListType,
                ideaItemList: obj.additionalData.ideaItemList
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

        // get ideas
        function pubGetIdeaList(exObject)
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
            var request = ideaWatcher.model.Request;

            request.destination = 'SIdeaList/getIdeaListRequest';
            request.data = exObject;

            return request;
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            registerShowView: pubRegisterShowView,
            registerRenderList: pubRegisterRenderList,
            getIdeaList: pubGetIdeaList
        };

    })();