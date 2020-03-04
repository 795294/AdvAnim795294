const PORT = 8080;;

//import express module
const express = require('express');
//import express-ws module
const expressWs = require('express-ws');
//create websocket
////
const wss = expressWs(express());
//create expressWs application
let app = wss.app;

let data = {
    type: "return msg",
    msg: "Hello client",
}

//callback functions for application
app.ws('/ws', function (ws, req) {
    //upon receiving a message, parse it, check it, and log it
    ws.on("message", function (event) {
        let tempData = JSON.parse(event);
        switch (tempData.type) {
            case "message":
                console.log("Message: '" + tempData["msg"] + "' received.");
                ws.send(JSON.stringify(data));
            break;
        }
    });
});

//open server with express module application
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});
