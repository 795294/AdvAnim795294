addEventListener("load", setup);

let messenger;
var context,
    canvas;

function setup() {
    canvas = document.getElementById("cnv");
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    canvas.style.backgroundColor = "rgb(135,206,250)";

    context = canvas.getContext("2d");

    messenger = new Client("Hello server!");
}

function render() {
    window.requestAnimationFrame(render);
    context.clearRect(0, 0, canvas.width, canvas.height);
}
