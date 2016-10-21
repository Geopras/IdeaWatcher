ideaWatcher.core.MessageBroker = ideaWatcher.core.MessageBroker || (function CMessageBroker() {

    //region local Vars
    // anzahl eingegangener Nachrichten
    var counterMessagesReceived = 0;
    var registeredTopics = {};
    var subscriberToken = -1;
    //endregion

    //region subscribe
    function pubSubscribe(subEvent){

        console.log("subscribe: " + subEvent.topic);
        subscriberToken++;

        if(!registeredTopics[subEvent.topic]){
            registeredTopics[subEvent.topic] = [];
        }

        registeredTopics[subEvent.topic].push({
            subscriberToken: subscriberToken,
            callbackFunction: subEvent.cbFunction
        });

        return subscriberToken;
    }
    //endregion

    //region publish
    function pubPublish(pubEvent) {

        counterMessagesReceived++;
        if(!registeredTopics[pubEvent.topic]) {
            console.log("Warnung: Für diese Nachricht gibt es keine Empfänger: " + pubEvent.topic);
            console.log(pubEvent);
            return false;
        }
        var subscribers = registeredTopics[pubEvent.topic];
        var countSubscribers = subscribers ? subscribers.length : 0;

        for(var i = 0; i < countSubscribers; i++) {
            subscribers[i].callbackFunction(pubEvent.exObject);
        }
    }
    //endregion

    //TODO: implement unsubscribe

    //region return
    return {
        subscribe: pubSubscribe,
        publish: pubPublish
    };
    //endregion

})();