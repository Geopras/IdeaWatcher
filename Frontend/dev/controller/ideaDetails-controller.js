ideaWatcher.controller.IdeaDetails = ideaWatcher.controller.IdeaDetails || (function () {

        // region local vars
        var cbInitView = null;
        var cbShowView = null;
        var cbLocalize = null;
        var cbGetIdeaResp = null;
        var cbGetIdea = null;
        var cbSaveCommentResp = null;
        var cbDeleteCommentResp = null;
        var cbLikeFollowResp = null;

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
        
        var evGetSaveCommentResponse = {
                topic: 'SIdeaDetails/saveCommentIdeaRequest-response',
                cbFunction: cbSaveCommentResponse
            };

        var evLikeFollowResponse = {
				topic : 'SIdeaDetails/LikeFollowIdeaRequest-response',
				cbFunction : cbLikeFollowResponse
			};
        
        var evDeleteCommentResponse = {
        		topic: 'SIdeaDetails/deleteCommentIdeaRequest-response',
        		cbFunction: cbDeleteCommentResponse
        };
        //endregion

        //region subscribe to events
        ideaWatcher.core.MessageBroker.subscribe(evIni);
        ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
        ideaWatcher.core.MessageBroker.subscribe(evLocalizeView);
        ideaWatcher.core.MessageBroker.subscribe(evGetIdeasResponse);
        ideaWatcher.core.MessageBroker.subscribe(evGetSaveCommentResponse);
        ideaWatcher.core.MessageBroker.subscribe(evLikeFollowResponse);
        ideaWatcher.core.MessageBroker.subscribe(evDeleteCommentResponse);
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
        
        function cbSaveCommentResponse(obj) {
        	cbSaveCommentResp(obj);
        }
        
        function cbDeleteCommentResponse(obj) {
        	cbDeleteCommentResp(obj);
        }
        
        function cbLikeFollowResponse(obj) {
        	cbLikeFollowResp(obj);
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

        function pubRegisterSaveCommentResponse(cb) {
            cbSaveCommentResp = cb;
        }
        
        function pubRegisterDeleteCommentResponse(cb) {
            cbDeleteCommentResp = cb;
        }
        
        function pubRegisterLikeFollowResponse(cb) {
            cbLikeFollowResp = cb;
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

        function pubTryToSaveComment(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestSaveComment(exObject));
            } else {
                //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
            }
        }

        function pubTryToDeleteComment(exObject)
        {
            // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
            if (ideaWatcher.core.WebSocketConnector.isConnected()) {
                ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestDeleteComment(exObject));
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
        
        function pubTryToEditIdea(ideaId) {

            ideaWatcher.controller.ideaCreation.tryToEditIdea(ideaId);
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
        
        function pubGetIdea(ideaId) {

            return ideaWatcher.controller.IdeaList.getIdea(ideaId);
        }


        function buildRequestLoadIdeaData(ideaId)
        {
            var exLoadUserDataRequest = Object.create(ideaWatcher.model.Request);

            exLoadUserDataRequest.destination = 'SIdea/getIdeaDetailsRequest';
            var exObj = {
                ideaId : ideaId
            };
            exLoadUserDataRequest.data = exObj;

            return exLoadUserDataRequest;
        }
        
        function buildRequestSaveComment(exObject)
        {
            var exCommentRequest = ideaWatcher.model.Request;

            exCommentRequest.destination = 'SIdeaDetails/saveCommentIdeaRequest';
            exCommentRequest.data = exObject;

            return exCommentRequest;
        }

        function buildRequestDeleteComment(exObject)
        {
            var exCommentRequest = ideaWatcher.model.Request;

            exCommentRequest.destination = 'SIdeaDetails/deleteCommentIdeaRequest';
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

        // diese Methoden stellen die öffentliche API dar, über welche mit dem Modul kommuniziert werden kann
        return {
            // hier kann die View eine Methode(ui-Connector) registrieren, die gerufen wird,
            // wenn die View ein/ausgeblendet werden soll
            getIdea: pubGetIdea,
            registerInitializeView: pubRegisterInitializeView,
            registerLocalizeView: pubRegisterLocalizeView,
            registerGetIdeaResponse: pubRegisterGetIdeaResponse,
            registerSaveCommentResponse: pubRegisterSaveCommentResponse,
            registerDeleteCommentResponse: pubRegisterDeleteCommentResponse,
            registerShowView: pubRegisterShowView,
            registerLikeFollowResponse: pubRegisterLikeFollowResponse,
            tryToComment: pubTryToComment,
            tryToChangeLikeFollow: pubTryToChangeLikeFollow,
            tryToGetIdea: pubTryToGetIdea,
            tryToLoadIdeaData: pubTryToLoadIdeaData,
            tryToSaveComment: pubTryToSaveComment,
            tryToDeleteComment: pubTryToDeleteComment,
            tryToEditIdea: pubTryToEditIdea,
            tryToDeleteIdea: pubTryToDeleteIdea
        };

    })();