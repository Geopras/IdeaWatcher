ideaWatcher.controller.IdeaList = ideaWatcher.controller.IdeaList || (function () {

        //region local vars
        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbGetIdeas = null;
        var cbGetCurrentListType = null;
        var cbGetCurrentCategory = null;
        var cbGetIdea = null;

        var evSwitchView = {
            topic: 'switchView/ideaList',
            cbFunction: cbSwitchView
        };

        // Event Globale Initialisierung
        var evIni = {
            topic: 'internal/ini',
            cbFunction: cbInitializeView
        };

        var evLocalizeView = {
            topic: 'localizeView/ideaList',
            cbFunction: cbLocalizeView
        };

        var evGetIdeasResponse = {
            topic: 'SIdeaList/getIdeasRequest-response',
            cbFunction: cbGetIdeasResponse
        };

        // var evIni = Object.create(wam.services.events.Ini);
        // evIni.cbFunction = cbIni;
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evGetIdeasResponse);

        // ideaWatcher.core.MessageBroker.subscribe(evSwitchViewFresh);
        // ideaWatcher.core.MessageBroker.subscribe(evSwitchViewTrending);
        // wtk.MessageBroker.subscribe(evIni);
        // wtk.connection.ResponseHandler.subscribe('SLogin/Response', sCBLoginResponse);
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
        //endregion

        function pubRegisterGetIdea(cb) {
             return cbGetIdea = cb;
        }

        function pubGetIdea(ideaId) {
            return cbGetIdea(ideaId);
        }

        //region build: Request
        function buildRequest(exObject)
        {
            var request = ideaWatcher.model.Request;

            request.destination = 'SIdeaList/getIdeasRequest';
            request.data = exObject;

            return request;
        }
        //endregion

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            getIdea: pubGetIdea,
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