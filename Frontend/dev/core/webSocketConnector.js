ideaWatcher.core.WebSocketConnector = ideaWatcher.core.WebSocketConnector || (function () {

        //region lokale Variablen
        var webSocket = null;
        var isConnected = false;
        var standardHeader = {
            token: '',
            userId: ''
        };
        //endregion

        //region Neue WebSocket-Verbindung einrichten

        // für alle verwirrten Seelen:
        // hier muss die Callbackfunktion übergeben werden, die gerufen werden soll,
        // wenn die Verbindung hergestellt/nicht Hergestellt wurde
        // Dies wird verwendet um dem Benutzer einen Indikator zugeben, ob die Verbindungsaufnahme erfolgreicgh war.
        // Des Weiteren wird das isConnected Flag entsprechend getzt, um später zu prüfen ob die Verbindung noch korrekt
        // aufgebaut ist.
        function pubConnect(url, callbackFunction) {

            if (webSocket != null) webSocket.close();
            console.log('Versuche eine neue WebSocket-Verbindung mit "' + url + '" herzustellen...');
            webSocket = new WebSocket(url);

            // callback function wenn Verbindung erfolgreich
            webSocket.onopen = function () {
                console.log('WebSocket-Verbindung erfolgreich hergestellt!');
                // callbackFunction(true);
                isConnected = true;
            };

            // callback function wenn eine Nachricht reinkommt
            webSocket.onmessage = function (event) {

                var language = ideaWatcher.core.Localizer.getLanguage();
                try {
                    var serverMessage = JSON.parse(event.data);
                } catch (error) {
                    console.log('Fehler beim Parsen der JSON-Daten vom' +
                        ' Server!\nFehlermeldung: ' + error);
                    console.log('Nachricht: ' + event.data);
                    ideaWatcher.controller.GlobalNotification.showNotification(
                        ideaWatcher.model.GlobalNotificationType.ERROR,
                        ideaWatcher.core.Localizer.WebSocketConnector[language]
                            .headline,
                        ideaWatcher.core.Localizer.WebSocketConnector[language]
                            .noValidServerResponse, 5000);
                }

                //region Response-Validierung, sofern keine Registrierungsantwort
                if (!serverMessage.destination.startsWith('SSignup')) {

                    var responseToken = serverMessage.token;
                    var responseUserId = serverMessage.userId;
                    if (!responseToken || responseToken === '') {
                        console.log('Die Serverantwort enthält keinen Token,' +
                            ' obwohl einer vorhanden sein muesste.');
                        ideaWatcher.controller.GlobalNotification.showNotification(
                            ideaWatcher.model.GlobalNotificationType.ERROR,
                            ideaWatcher.core.Localizer.WebSocketConnector[language]
                                .headline,
                            ideaWatcher.core.Localizer.WebSocketConnector[language]
                                .noValidServerResponse, 5000);
                        return;
                    }
                    if (!responseUserId || responseUserId === '') {
                        console.log('Die Serverantwort enthält keine UserId,' +
                            ' obwohl eine vorhanden sein muesste.');
                        ideaWatcher.controller.GlobalNotification.showNotification(
                            ideaWatcher.model.GlobalNotificationType.ERROR,
                            ideaWatcher.core.Localizer.WebSocketConnector[language]
                                .headline,
                            ideaWatcher.core.Localizer.WebSocketConnector[language]
                                .noValidServerResponse, 5000);
                        return;
                    }

                    if (serverMessage.destination.startsWith('SLogin')) {
                        standardHeader.token = responseToken;
                        standardHeader.userId = responseUserId;
                    }
                    else if (responseUserId !== standardHeader.userId) {
                        console.log('Antwort-UserId stimmt nicht mit' +
                            ' gespeicherter UserId überein!')
                        ideaWatcher.controller.GlobalNotification.showNotification(
                            ideaWatcher.model.GlobalNotificationType.ERROR,
                            ideaWatcher.core.Localizer.WebSocketConnector[language]
                                .headline,
                            ideaWatcher.core.Localizer.WebSocketConnector[language]
                                .noValidServerResponse, 5000);
                        return;
                    }
                }
                //endregion

                console.log('Servernachricht: ' + serverMessage);

                // Nachricht veröffentlichen
                ideaWatcher.core.MessageBroker.publish({
                    topic: serverMessage.destination,
                    exObject: serverMessage
                });
            };

            webSocket.onerror = function (error) {
                console.log('Fehler! Verbindungsaufbau schief gegangen!');
                console.log('Fehlermeldung: ' + error);
                var language = ideaWatcher.core.Localizer.getLanguage();
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.WebSocketConnector[language].headline,
                    ideaWatcher.core.Localizer.WebSocketConnector[language]
                        .connectionInterrupted, 5000);
                isConnected = false;
            };
            webSocket.onclose = function (event) {
                isConnected = false;
                var reason = '';

                if (event.code === 1006) {
                    reason = 'WebSocket-Verbindung zum Application Server konnte nicht aufgebaut werden';
                }
                if (event.code === 1001) {
                    reason = 'WebSocket-Verbindung zum Application Server wurde unterbrochen';
                }
                if (event.code === 1008 || event.code === 1003) {
                    reason = event.reason;
                }
                var errorText = 'Grund für Verbindungstrennung: ' + event.code + ' --- ' + reason;
                console.log(errorText);
                var language = ideaWatcher.core.Localizer.getLanguage();
                ideaWatcher.controller.GlobalNotification.showNotification(
                    ideaWatcher.model.GlobalNotificationType.ERROR,
                    ideaWatcher.core.Localizer.WebSocketConnector[language].headline,
                    ideaWatcher.core.Localizer.WebSocketConnector[language]
                        .connectionClosed, 5000);
                // besser als Objekt schreiben um nicht zu verwirren?
                // callbackfunction(false, {
                //     code: event.code,
                //     reason: reason
                // });
            };
        }

        //endregion

        //region sende den Request an den Server
        function pubSendRequest(message) {

            //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for...in
            for (var propStandardHeader in standardHeader) {

                if (!message.destination.startsWith('SLogin') &&
                    !message.destination.startsWith('SSignup') &&
                    !standardHeader.hasOwnProperty(propStandardHeader)) {
                    console.log('Folgende Validierungseigenschaft fehlt zum ' +
                        'Absenden der Anfrage: ' + propStandardHeader);
                }
                else if (standardHeader.hasOwnProperty(propStandardHeader)) {
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