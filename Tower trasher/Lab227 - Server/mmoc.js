function MMOC() {
    const reqd = (name) => { throw new Error("Expected argument '" + name + "'") };

    this.id = "";
    this.other = {};
    this.data = {};
    this.connected = false;

    this.init = function(id_len=8, wsurl) {
            // if no websocket url was supplied, use the same url as the index
            // file but with the ws protocol
            if(!wsurl){
                wsurl="//" + document.domain + ":" + location.port + "/ws";
                if (location.protocol === "https:"){
                    wsurl = "wss:" + wsurl;
                } else {
                    wsurl = "ws:" + wsurl;
                } 
            }
            this.ws = new WebSocket(wsurl);

            this.ws.onopen = function (event) {
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (let i = 0; i < id_len; i++) {
                    this.id += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                this.connected = true;

                setInterval(() => {
                    this.send(JSON.stringify({
                        type: 3
                    }));
                }, 15);
            };

            this.ws.onmessage = function (event) {

                this.data = JSON.parse(event.data);
            };

        }

        this.sendGreeting = function() {
            this.ws.send(JSON.stringify({
                type: "greeting",
                text: "hello server",
                id: this.id
            }));
        }

        // this.isConnected() = function() {
        //     return new Promise(function(resolve, reject) {
        //         if (this.connected) {
        //             resolve();
        //         } else {
        //             reject();
        //         }
        //     });
        // }
        
    }
    


