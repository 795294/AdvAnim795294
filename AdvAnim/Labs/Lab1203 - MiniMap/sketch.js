addEventListener("load", setup);
addEventListener("keydown", moveCanvas);

var canvas;
var context;

let snakes = [];

var canvasWidth = 800;
var canvasHeight = 600;

var worldWidth = 4000;
var worldHeight = 3000;

var canvasX = -1600;   // where the origin is
var canvasY = -1200;


function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  loadSnakes(5);


  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);



  for(let i = 0; i < snakes.length; i++){

    snakes[i].run();
  }

    context.setTransform(1,0,0,1,0,0);

    context.translate(-canvasX, -canvasY);
}

function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()*10)-5, (Math.random()*10)-5, 30));

    snakes[i].loadSegments(10);
  }
}

function moveCanvas(keyPressed){

  if(keyPressed.code = "ArrowRight"){
    canvasX -= 1;
  }
}
