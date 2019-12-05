addEventListener("load", setup);
addEventListener("keydown", moveCanvas);

var canvas;
var context;

let snakes = [];

var canvasWidth = 800;
var canvasHeight = 600;

var worldWidth = 4000;
var worldHeight = 3000;

var canvasX = -400;   // where the origin is
var canvasY = -300;


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

  context.save();

  context.translate(-canvasX, -canvasY);

  context.beginPath();

  context.moveTo(-2000,0);

  context.lineTo(2000,0);

  context.moveTo(0,-1500);

  context.lineTo(0,1500);

  context.strokeStyle = 'red';

  context.lineWidth = 2;

  context.stroke();

  context.beginPath();

  context.rect(-2000,-1500, 4000, 3000);

  context.strokeStyle = 'blue';

  context.lineWidth = 2;

  context.stroke();

  for(let i = 0; i < snakes.length; i++){

    snakes[i].run();
  }

  context.restore();

}

function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()*10)-5, (Math.random()*10)-5, 30));

    snakes[i].loadSegments(10);
  }
}

function moveCanvas(keyPressed){

  var canvasMovementRate = 5;

  if(keyPressed.code === "ArrowRight"){
    canvasX += canvasMovementRate;
  }

  if(keyPressed.code === "ArrowLeft"){
    canvasX -= canvasMovementRate;
  }

  if(keyPressed.code === "ArrowDown"){
    canvasY += canvasMovementRate;
  }

  if(keyPressed.code === "ArrowUp"){
    canvasY -= canvasMovementRate;
  }

  if(keyPressed.code === "ShiftRight"){
    canvasMovementRate*10;
  } else {
    canvasMovementRate*1;
  }

  console.log(keyPressed);
}
