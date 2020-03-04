function Client(message) {

        this.ws;

        this.data = {
            type: "message",
            msg: message,
        };

        let url = "ws://localhost:8080/ws";

        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify(this.data));
            console.log("Open");
        }

        this.ws.onmessage = (event) => {
            console.log('Message "' + JSON.parse(event.data)["msg"] + '" received.');
            this.printMessage("message");
        }

        this.printMessage = function(message){

            context.font = '50px serif';

            context.fillStyle = "blue";

            context.fillText(message, canvas.width/2, canvas.height/2);

            console.log("print");
        }
}
