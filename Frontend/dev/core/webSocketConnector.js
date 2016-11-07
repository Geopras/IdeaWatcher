ideaWatcher.core.WebSocketConnector = ideaWatcher.core.WebSocketConnector || (function () {

        //region lokale Variablen
        var webSocket = null;
        var isConnected = false;
        var standardHeader = {};
        //endregion

        //region Neue WebSocket-Verbindung einrichten
        function pubConnect(url, callbackFunction) {
            if (webSocket != null) webSocket.close();
            console.log('Versuche eine neue WebSocket-Verbindung mit "' + url + '" herzustellen...');
            webSocket = new WebSocket(url);

            // callback function wenn Verbindung erfolgreich
            webSocket.onOpen = function () {
                console.log('WebSocket-Verbindung erfolgreich hergestellt!');
                callbackFunction(true);
                isConnected = true;
            };

            // callback function wenn eine Nachricht reinkommt
            webSocket.onMessage = function (event) {
                try {
                    var serverMessage = JSON.parse(event.data);
                    console.log(serverMessage);

                    ideaWatcher.core.MessageBroker.publish({
                        topic: serverMessage.destination,
                        exObject: serverMessage
                    });
                }
                catch (error) {
                    console.log('Fehler beim Parsen der JSON-Daten vom Server -> Fehlermeldung: ' + error);
                    console.log('Nachricht: ' + serverMessage);
                }
            };

            webSocket.onError = function (error) {
                console.log('Fehler! Verbindungsaufbau schief gegangen!');
                console.log('Fehlermeldung: ' + error);
                isConnected = false;
            };
            webSocket.onClose = function (event) {
                isConnected = false;
                var reason = '', errorText = '';

                if (event.code === 1006) {
                    reason = 'WebSocket-Verbindung zum Application Server konnte nicht aufgebaut werden';
                }
                if (event.code === 1001) {
                    reason = 'WebSocket-Verbindung zum Application Server wurde unterbrochen';
                }
                if (event.code === 1008 || event.code === 1003) {
                    reason = event.reason;
                }
                errorText = 'Grund für Verbindungstrennung: ' + event.code + ' --- ' + reason;
                console.log(errorText);
                // besser als Objekt schreiben um nicht zu verwirren?
                callbackfunction(false, {
                    code: event.code,
                    reason: reason
                });
            };
        }

        //endregion

        //region sende den Request an den Server
        function pubSendRequest(message) {

            //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for...in
            for (var propStandardHeader in standardHeader) {
                if (standardHeader.hasOwnProperty(propStandardHeader)) {
                    message[propStandardHeader] = standardHeader[propStandardHeader];
                }
            }

            webSocket.send(JSON.stringify(message));
        }

        //endregion

        //region Setzen des StandardHeader
        function pubSetStandardHeader(standardHeaderObject) {
            standardHeader = standardHeaderObject;
        }

        //endregion

        //region isConnected
        function pubIsConnected() {
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