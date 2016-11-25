ideaWatcher.controller.IdeaList = ideaWatcher.controller.IdeaList || (function () {

        //region local vars & events
        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbGetIdea = null;
        var cbGetDeleteIdeaResp = null;
        var cbGetEditIdeaResp = null;
        var cbGetCurrentListType = null;
        var cbGetCurrentCategory = null;
        var cbGetIdeasResp = null;

        var evSwitchViewToIdeaList = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.HOT.NONE,
            cbFunction: cbSwitchView
        };

        var evSwitchViewToMyIdeas = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.MYIDEAS.NONE,
            cbFunction: cbSwitchView
        };

        var evSwitchViewToMyFollowedIdeas = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.MYFOLLOWEDIDEAS.NONE,
            cbFunction: cbSwitchView
        };

        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evLocalizeView = {
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.HOT.NONE,
            cbFunction: cbLocalizeView
        };

        var evGetIdeasResponse = {
            topic: 'SIdeaList/getIdeasRequest-response',
            cbFunction: cbGetIdeasResponse
        };

        var evGetDeleteIdeaResponse = {
            topic: 'SIdeaList/deleteIdeaRequest-response',
            cbFunction: cbGetDeleteIdeaResponse
        };

        var evGetEditIdeaResponse = {
            topic: 'SIdeaList/editIdeaRequest-response',
            cbFunction: cbGetEditIdeaResponse
        };

        //endregion

        //region subscribe to events

        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewToIdeaList);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewToMyIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewToMyFollowedIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evGetIdeasResponse);
        ideaWatcher.core.MessageBroker.subscribe(evGetDeleteIdeaResponse);
        ideaWatcher.core.MessageBroker.subscribe(evGetEditIdeaResponse);

        //endregion

        //region Callback-Functions für MessageBroker
        function cbSwitchView(obj) {
            cbShowView(obj);
        }

        function cbInitializeView(obj) {
            cbInitView();
        }

        function cbLocalizeView(obj) {
            cbLocalize();
        }

        function cbGetIdeasResponse(obj) {
            cbGetIdeasResp(obj);
        }

        function cbGetDeleteIdeaResponse(obj) {
            cbGetDeleteIdeaResp(obj);
        }

        function cbGetEditIdeaResponse(obj) {
            cbGetEditIdeaResp(obj);
        }

        //endregion

        //region Registrierung der Callbacks vom uiConnector

        function pubRegisterInitializeView(cb) {
            cbInitView = cb;
        }

        // Event-Callback zur Anzeige der View
        function pubRegisterShowView(cb) {
            cbShowView = cb;
        }

        // Event-Callback zur Lokalisierung der View
        function pubRegisterLocalizeView(cb) {
            cbLocalize = cb;
        }

        // Schnittstelle für UI-Connector, damit er Daten erhält
        function pubRegisterGetIdeasResponse(cb) {
            cbGetIdeasResp = cb;
        }

        function pubRegisterGetDeleteIdeaResponse(cb) {
            cbGetDeleteIdeaResp = cb;
        }

        function pubRegisterGetEditIdeaResponse(cb) {
            cbGetEditIdeaResp = cb;
        }

        function pubRegisterGetCurrentListType(cb) {
            cbGetCurrentListType = cb;
        }

        function pubRegisterGetCurrentCategory(cb) {
            cbGetCurrentCategory = cb;
        }

        function pubRegisterGetIdea(cb) {
            cbGetIdea = cb;
        }

        //endregion

        //region nach außen angebotene Schnittstellen-Funktionen
        /**
         * Schnittstelle für andere Controller, um die Ideenliste mit
         * gewünschten Daten zu aktualisieren
         * @param listType {IdeaList.ListType} spezieller Ideenlistentyp
         * @param category {IdeaList.Category} spezieller Ideenkategorietyp
         * @param from {number} Startindex der nach Typ gefilterten Ideenlise
         * @param to {number} Endindex der nach Typ gefilterten Ideenlise
         * @param isRenderNewIdeaList {boolean} Wenn der Anfang der
         * gefilterten Ideenliste angezeigt werden soll
         */
        function pubUpdateIdeaList(listType, category, from, to, isRenderNewIdeaList)
        {
            var requestData = Object.create(ideaWatcher.model.ExchangeObject.IdeaList.RequestData);

            if (!listType) {
                listType = pubGetCurrentClickedListType();
            }
            if (!category) {
                category = pubGetCurrentClickedCategory();
            }
            requestData.listType = listType;
            requestData.category = category;
            requestData.fromRank = from;
            requestData.toRank = to;
            requestData.isRenderNewIdeaList = isRenderNewIdeaList;

            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildGetIdeasRequest(requestData));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildGetIdeasRequest(exObject)
        {
            var request = ideaWatcher.model.Request;

            request.destination = 'SIdeaList/getIdeasRequest';
            request.data = exObject;

            return request;
        }



        function pubSwitchToCreateIdeaView(idea) {

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId.CREATEIDEA;
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.CREATEIDEA;
            exObj.additionalData = idea;

            ideaWatcher.core.Navigator.switchView(exObj);
        }

        function pubGetIdea(ideaId) {
            return cbGetIdea(ideaId);
        }

        function pubTryToDeleteIdea(ideaId) {

            var requestData = {
                ideaId: ideaId
            };

            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildDeleteIdeaRequest(requestData));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildDeleteIdeaRequest(requestData) {

            var request = Object.create(ideaWatcher.model.Request);

            request.destination = 'SIdeaList/deleteIdeaRequest';
            request.data = requestData;

            return request;
        }

        function pubTryToEditIdea(ideaId) {

            ideaWatcher.controller.ideaCreation.tryToEditIdea(ideaId);
        }

        function pubNavigateToCreateIdeaView() {

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId.CREATEIDEA;
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.CREATEIDEA;
            exObj.additionalData.isEdit = true;

            ideaWatcher.core.Navigator.switchView(exObj);
        }

        function pubGetCurrentClickedCategory() {

            return ideaWatcher.controller.MainMenu.getCurrentClickedCategory();
        }

        function pubGetCurrentClickedListType() {

            return ideaWatcher.controller.MainMenu.getCurrentClickedListType();
        }

        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            getCurrentClickedCategory: pubGetCurrentClickedCategory,
            getCurrentClickedListType: pubGetCurrentClickedListType,
            getIdea: pubGetIdea,
            navigateToCreateIdeaView: pubNavigateToCreateIdeaView,
            registerInitializeView: pubRegisterInitializeView,
            registerShowView: pubRegisterShowView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerGetIdeasResponse: pubRegisterGetIdeasResponse,
            registerGetDeleteIdeaResponse: pubRegisterGetDeleteIdeaResponse,
            registerGetEditIdeaResponse: pubRegisterGetEditIdeaResponse,
            registerGetIdea: pubRegisterGetIdea,
            switchToCreateIdeaView: pubSwitchToCreateIdeaView,
            tryToDeleteIdea: pubTryToDeleteIdea,
            tryToEditIdea: pubTryToEditIdea,
            updateIdeaList: pubUpdateIdeaList
        };

    })();