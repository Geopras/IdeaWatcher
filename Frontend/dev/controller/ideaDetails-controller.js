ideaWatcher.controller.IdeaDetails = ideaWatcher.controller.IdeaDetails || (function () {

    var userName = null;
    var email = null;
    var password = null;
    var cbShowView = null;
    var evSwitchView = {
        topic: 'switchView/ideaDetails',
        cbFunction: cbSwitchView
    };
    //endregion

    //region subscribe to events
    ideaWatcher.core.MessageBroker.subscribe(evSwitchView);
    //endregion

    function pubTryToComment(exObject)
    {
        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestComment(exObject));
        } else {
            //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
        }
    }
    
    function pubTryToChangeLike(exObject)
    {
        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestLike(exObject));
        } else {
            //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
        }
    }
    
    function pubTryToChangeFollower(exObject)
    {
        // Wenn bereits eine Verbindung zum Backend besteht, wird der Request an das Backend geschickt
        if (ideaWatcher.core.WebSocketConnector.isConnected()) {
            ideaWatcher.core.WebSocketConnector.sendRequest(buildRequestFollow(exObject));
        } else {
            //TODO: Was soll bei einer nicht bestehenden Verbindung passieren??
        }
    }

    function buildRequestComment(exObject)
    {
        var exCommentRequest = ideaWatcher.model.Request;

        exCommentRequest.destination = 'SIdeaDetails/commentIdea';
        exCommentRequest.data = exObject;

        return exCommentRequest;
    }
    
    function buildRequestLike(exObject)
    {
        var exLikeRequest = ideaWatcher.model.Request;

        exLikeRequest.destination = 'SIdeaDetails/likeIdea';
        exLikeRequest.data = exObject;

        return exLikeRequest;
    }
    
    function buildRequestFollow(exObject)
    {
        var exFollowRequest = ideaWatcher.model.Request;

        exFollowRequest.destination = 'SIdeaDetails/followIdea';
        exFollowRequest.data = exObject;

        return exFollowRequest;
    }
    
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
        registerShowView: pubRegisterShowView,
        tryToComment: pubTryToComment,
        tryToChangeLike: pubTryToChangeLike,
        tryToChangeFollower: pubTryToChangeFollower
    };

})();