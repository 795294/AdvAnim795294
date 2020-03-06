addEventListener("load", setup);

var canvas,
    context;

var messenger;

function setup() {

    canvas = document.getElementById("cnv");

    canvas.width = 800;
    canvas.height = 600;

    context = canvas.getContext("2d");

    canvas.style.backgroundColor = 'rgba(0,0,0,1)';

    messenger = new MMOC();

    messenger.init();
    //messenger.isConnected();

    messenger.sendMessage();
}

