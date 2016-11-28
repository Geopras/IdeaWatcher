ideaWatcher.controller.ideaCreation = ideaWatcher.controller.ideaCreation || (function () {

        //region lokale Variablen
        var cbIni = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbGetIdeaResp = null;
        var cbSaveIdeaResp = null;
        var cbPublishIdeaResp = null;
        //endregion

        //region Event Globale Initialisierung

        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evSwitchView = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.CREATEIDEA,
            cbFunction: cbSwitchView
        };

        var evLocalizeView = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.CREATEIDEA,
            cbFunction: cbLocalizeView
        };

        var evGetIdeaToEditResponse = {
            topic: 'SIdeaCreation/getIdeaToEditRequest-response',
            cbFunction: cbGetIdeaResponse
        };

        var evSaveIdeaResponse = {
            topic: 'SIdeaCreation/saveIdeaRequest-response',
            cbFunction: cbSaveIdeaResponse
        };

        var evPublishIdeaResponse = {
            topic: 'SIdeaCreation/publishIdeaRequest-response',
            cbFunction: cbPublishIdeaResponse
        };


        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evGetIdeaToEditResponse);
        ideaWatcher.core.MessageBroker.subscribe(evSaveIdeaResponse);
        ideaWatcher.core.MessageBroker.subscribe(evPublishIdeaResponse);
        //endregion

        //region Callbacks definieren

        function cbInitializeView(obj) {
            cbIni();
        }
        function cbSwitchView(obj)
        {
            // if(obj.shouldShow) wam.logic.Header.showHeader(false);
            cbShowView(obj);
        }

        function cbLocalizeView(obj) {
            cbLocalize();
        }

        function cbGetIdeaResponse(obj) {
            cbGetIdeaResp(obj);
        }

        function cbSaveIdeaResponse(obj) {
            cbSaveIdeaResp(obj);
        }

        function cbPublishIdeaResponse(obj) {
            cbPublishIdeaResp(obj);
        }

        //endregion

        //region register Callbacks

        function pubRegisterInitializeView(cb) {
            cbIni = cb;
        }
        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }

        function pubRegisterLocalizeView(cb) {
            cbLocalize = cb;
        }

        function pubRegisterGetIdeaToEditResponse(cb) {
            cbGetIdeaResp = cb;
        }

        function pubRegisterSaveIdeaResponse(cb) {
            cbSaveIdeaResp = cb;
        }

        function pubRegisterPublishIdeaResponse(cb) {
            cbPublishIdeaResp = cb;
        }
        //endregion

        function pubTryToEditIdeaData(ideaId)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestGetIdeaToEdit(ideaId));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildRequestGetIdeaToEdit(ideaId)
        {
            var request = Object.create(ideaWatcher.model.Request);

            request.destination = 'SIdeaCreation/getIdeaToEditRequest';
            var exObj = {
                ideaId : ideaId
            };
            request.data = exObj;

            return request;
        }

        function pubTryToSaveNewIdeaData(ideaData)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestSaveNewIdeaData(ideaData));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildRequestSaveNewIdeaData(ideaData)
        {
            var request = Object.create(ideaWatcher.model.Request);

            request.destination = 'SIdeaCreation/saveIdeaRequest';
            request.data = ideaData;

            return request;
        }

        function pubTryToPublishIdea(idea)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestPublishIdea(idea));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildRequestPublishIdea(idea)
        {
            var request = Object.create(ideaWatcher.model.Request);

            request.destination = 'SIdeaCreation/publishIdeaRequest';
            request.data = idea;

            return request;
        }

        function pubCancelSaveIdea() {

            var listType = ideaWatcher.model.IdeaList.ListType.MYIDEAS;
            var category = ideaWatcher.model.IdeaList.Category.NONE;

            ideaWatcher.controller.IdeaList.updateIdeaList(listType, category, 1, 10, true);
        }


        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            cancelSaveIdea: pubCancelSaveIdea,
            registerGetIdeaToEditResponse: pubRegisterGetIdeaToEditResponse,
            registerPublishIdeaResponse: pubRegisterPublishIdeaResponse,
            registerSaveIdeaResponse: pubRegisterSaveIdeaResponse,
            registerInitializeView: pubRegisterInitializeView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerShowView: pubRegisterShowView,
            tryToEditIdea: pubTryToEditIdeaData,
            tryToPublishIdea: pubTryToPublishIdea,
            tryToSaveNewIdea: pubTryToSaveNewIdeaData
        };

    })();