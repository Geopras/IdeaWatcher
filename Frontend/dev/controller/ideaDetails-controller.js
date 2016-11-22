ideaWatcher.controller.IdeaDetails = ideaWatcher.controller.IdeaDetails || (function () {

        // region local vars
        var userName = null;
        var email = null;
        var password = null;
        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbGetIdeaResp = null;
        var cbGetIdea = null;



        // Event Globale Initialisierung
        var evIni = {
            topic : 'internal/ini',
            cbFunction : cbInitializeView
        };

        var evLocalizeView = {
            topic : 'localizeView/ideaDetails',
            cbFunction : cbLocalizeView
        };

        var evSwitchView = {
            topic: 'switchView/' + ideaWatcher.model.Navigation.ViewId.IDEADETAILS,
            cbFunction: cbSwitchView
        };

        var evGetIdeasResponse = {
            topic: 'SIdeaDetails/getIdeaRequest-response',
            cbFunction: cbGetIdeaResponse
        };

        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evGetIdeasResponse);
        //endregion

        function cbInitializeView(obj) {
            cbInitView();
        }

        function cbLocalizeView(obj) {
            cbLocalize();
        }

        function cbGetIdeaResponse(obj) {
            cbGetIdeaResp(obj);
        }

        //region Callback: Internal - SwitchView
        function cbSwitchView(obj)
        {
            // if(obj.shouldShow) wam.logic.Header.showHeader(false);
            cbShowView(obj);
        }
        //endregion

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
        function pubRegisterGetIdeaResponse(cb) {
            cbGetIdeaResp = cb;
        }

        function pubRegisterGetIdea(cb) {
            cbGetIdea = cb;
        }

        function pubTryToLoadIdeaData(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLoadIdeaData(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function buildRequestLoadIdeaData(ideaId)
        {
            var exLoadUserDataRequest = ideaWatcher.model.Request;

            exLoadUserDataRequest.destination = 'SIdea/getIdeaDetailsRequest';
            var exObj = {
                ideaId : ideaId,
            };
            exLoadUserDataRequest.data = exObj;

            return exLoadUserDataRequest;
        }

        function pubTryToComment(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestComment(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function pubTryToChangeLikeFollow(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLikeFollow(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function pubTryToGetIdea(exObject) {

            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestGetIdea(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function pubGetIdea(ideaId) {

            return ideaWatcher.controller.IdeaList.getIdea(ideaId);
        }

        function buildRequestComment(exObject)
        {
            var exCommentRequest = ideaWatcher.model.Request;

            exCommentRequest.destination = 'SIdeaDetails/commentIdeaRequest';
            exCommentRequest.data = exObject;

            return exCommentRequest;
        }

        function buildRequestLikeFollow(exObject)
        {
            var exLikeRequest = ideaWatcher.model.Request;

            exLikeRequest.destination = 'SIdeaDetails/LikeFollowIdeaRequest';
            exLikeRequest.data = exObject;

            return exLikeRequest;
        }

        function buildRequestGetIdea(exObject)
        {
            var exFollowRequest = ideaWatcher.model.Request;

            exFollowRequest.destination = 'SIdeaDetails/getIdea';
            exFollowRequest.data = exObject;

            return exFollowRequest;
        }



        //region register Callbacks
        // function pubRegisterVerificationError(cb) {
        //     cbVerificationError = cb;
        // }


        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            getIdea: pubGetIdea,
            registerInitializeView: pubRegisterInitializeView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerGetIdeaResponse: pubRegisterGetIdeaResponse,
            registerShowView: pubRegisterShowView,
            tryToComment: pubTryToComment,
            tryToChangeLikeFollow: pubTryToChangeLikeFollow,
            tryToGetIdea: pubTryToGetIdea,
            tryToLoadIdeaData: pubTryToLoadIdeaData
        };

    })();