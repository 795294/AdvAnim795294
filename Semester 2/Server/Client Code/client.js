class Client {
    constructor(message) {
        this.ws;

        this.data = {
            type: "message",
            msg: message,
        };

        let url = "ws://localhost:8080";

        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify(this.data));
            console.log("Open");
        }

        this.ws.onmessage = (event) => {
            console.log("Message -- " + JSON.parse(event).msg + " -- received.");
        }
    }
}
