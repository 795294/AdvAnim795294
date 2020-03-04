addEventListener("load", setup);

var messenger;

var canvas,
    context;

function setup() {
    canvas = document.getElementById("cnv");

    canvas.width = 800;
    canvas.height = 600;

    context = canvas.getContext("2d");

    canvas.style.border = 'solid black 2px';

    canvas.style.backgroundColor = 'rgb(255,255,255)';

    messenger = new Client("Hello server!");

    draw();
}

function draw() {
    requestAnimationFrame(draw);

    context.clearRect(0, 0, canvas.width, canvas.height);

}
