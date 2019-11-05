addEventListener("load", setup);

var canvas;
var context;

var snake;


function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  snake = new Snake(10, 'white', 200, 200, 5, 4, 20);

  snake.loadSegments(10);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  snake.run();
}
