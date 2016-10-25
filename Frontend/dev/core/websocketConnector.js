ideaWatcher.core.WebSocketConnector = ideaWatcher.core.WebSocketConnector|| (function () {

    //region local vars
    var socket = null;
    var isConnected = false;
    var standardHeader = {};
    //endregion

    //region connect and setup callbacks
    function pubConnect(url, callbackfunction)
    {
        if(socket != null) socket.close();
        console.log("try to open socket connection");
        socket = new WebSocket(url);

        // callback function when connection is established
        socket.onopen = function ()
        {
            console.log("Opened socket succesfully");
            callbackfunction(true);
            isConnected = true;
        };

        socket.onmessage = function (event)
        {
            try
            {
                var serverMessage = JSON.parse(event.data);
                console.log(serverMessage);

                ideaWatcher.core.MessageBroker.publish({
                    topic: serverMessage.destination,
                    exObject: serverMessage
                });
            }
            catch(e){
                console.log("Fehler beim parsen der JSON - Daten vom Server Fehler: " + e);
                console.log("Nachricht: " + serverMessage);
            }
        };

        socket.onerror = function ()
        {
            console.log("Error! Verbindungsaufbau schief gegangen");
            isConnected = false;
        };
        socket.onclose = function (closeEvent)
        {
            isConnected = false;
            var reason = '', errorText = '';

            if (closeEvent.code === 1006) {
                reason = "Verbindung zum Application Server konnte nicht aufgebaut werden";
            }
            if (closeEvent.code === 1001) {
                reason = "Verbindung zum Application Server wurde unterbrochen";
            }
            if (closeEvent.code === 1008 || closeEvent.code === 1003) {
                reason = closeEvent.reason;
            }
            errorText = 'Close: ' + closeEvent.code + ' --- ' + reason;
            console.log(errorText);
            // besser als Objekt schreiben um nicht zu verwirren?
            callbackfunction(false, {
                code: closeEvent.code,
                reason: reason
            });
        };
    }
    //endregion

    //region sende den Request an den Server
    function pubSendRequest(message) {

        //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for...in
        for(var propStandardHeader in standardHeader)
        {
            if(standardHeader.hasOwnProperty(propStandardHeader))
            {
                message[propStandardHeader] = standardHeader[propStandardHeader];
            }
        }

        socket.send(JSON.stringify(message));
    }
    //endregion

    //region setzen des StandardHeader
    function pubSetStandardHeader(standardHeaderObject)
    {
        standardHeader = standardHeaderObject;
    }
    //endregion

    //region isConnected
    function pubIsConnected()
    {
        return isConnected;
    }
    //endregion

    return {
        connectToServer: pubConnect,
        isConnected: pubIsConnected,
        sendRequest: pubSendRequest,
        setStandardHeader: pubSetStandardHeader
    };

})();