// Als Test wird nur eine Nachricht zum Webserver hin und wieder zurück geschickt:

var webSocket;

var message = {
    source: 'login-view',
    destination: 'login-validate',
    data: {
        username: "user1",
        password: "test"
    }
};

function connectWebSocket() {
    if (webSocket == null) {
        webSocket = new WebSocket('ws://localhost:8080/IdeaWatcher/wsEndpoint');
    }
    webSocket.onopen = function () {
        console.log('Info: WebSocket connection opened');
        debugger
        webSocket.send(JSON.stringify(message))
    };
    webSocket.onmessage = function (event) {
        console.log('Received: ' + event.data);
    };
    webSocket.onclose = function (event) {
        console.log('Info: WebSocket connection closed, Code: ' + event.code + (event.reason == "" ? "" : ", Reason: " + event.reason));
    }

}