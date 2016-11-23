ideaWatcher.controller.IdeaList = ideaWatcher.controller.IdeaList || (function () {

        //region local vars & events
        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbGetIdeas = null;
        var cbGetCurrentListType = null;
        var cbGetCurrentCategory = null;
        var cbGetIdea = null;

        var evSwitchViewToIdeaList = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.IDEALIST,
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
            topic: 'localizeView/' + ideaWatcher.model.Navigation.ViewId.IDEALIST,
            cbFunction: cbLocalizeView
        };

        var evGetIdeasResponse = {
            topic: 'SIdeaList/getIdeasRequest-response',
            cbFunction: cbGetIdeasResponse
        };

        //endregion

        //region subscribe to events

        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewToIdeaList);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewToMyIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchViewToMyFollowedIdeas);
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evGetIdeasResponse);

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
            cbGetIdeas(obj);
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
            cbGetIdeas = cb;
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
            var requestData = ideaWatcher.model.ExchangeObject.IdeaList.RequestData;

            if (!listType) {
                listType = cbGetCurrentListType();
            }
            if (!category) {
                category = cbGetCurrentCategory();
            }
            requestData.listType = listType;
            requestData.category = category;
            requestData.fromRank = from;
            requestData.toRank = to;
            requestData.isRenderNewIdeaList = isRenderNewIdeaList;

            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequest(requestData));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildRequest(exObject)
        {
            var request = ideaWatcher.model.Request;

            request.destination = 'SIdeaList/getIdeasRequest';
            request.data = exObject;

            return request;
        }

        function pubGetIdea(ideaId) {
            return cbGetIdea(ideaId);
        }

        function pubNavigateToCreateIdeaView() {

            var exObj = Object.create(ideaWatcher.model.ExchangeObject.SwitchView);
            exObj.viewId = ideaWatcher.model.Navigation.ViewId.CREATEIDEA;
            exObj.viewUrl = ideaWatcher.model.Navigation.ViewUrl.CREATEIDEA;

            ideaWatcher.core.Navigator.switchView(exObj);
        }

        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            getIdea: pubGetIdea,
            navigateToCreateIdeaView: pubNavigateToCreateIdeaView,
            registerInitializeView: pubRegisterInitializeView,
            registerShowView: pubRegisterShowView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerGetIdeasResponse: pubRegisterGetIdeasResponse,
            registerGetCurrentListType: pubRegisterGetCurrentListType,
            registerGetCurrentCategory: pubRegisterGetCurrentCategory,
            registerGetIdea: pubRegisterGetIdea,
            updateIdeaList: pubUpdateIdeaList
        };

    })();