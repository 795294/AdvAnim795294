addEventListener("load", setup);
addEventListener("keydown", moveCanvas);

var canvas;
var context;

let snakes = [];

var canvasWidth = 800;
var canvasHeight = 600;

var canvasX = -400;   // where the origin is
var canvasY = -300;

var miniCtx;
var miniCanvas;

var world =
{
  width: 4000,
  height: 3000,
};

let ships  = [];

var minimap = // Object to draw minimap
{
    width: world.width / 10,
    height: world.height / 10,
};


function setup(){

  canvas = document.getElementById("cnv");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  miniCanvas = document.getElementById("minimap");

  miniCanvas.width = minimap.width;
  miniCanvas.height = minimap.height;

  miniCtx = miniCanvas.getContext("2d");

  miniCanvas.style.border = 'solid black 2px';
  miniCanvas.style.backgroundColor = 'rgba(0,0,0,1)';


  loadSnakes(5);
  loadShips(5);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  context.save();

  context.translate(-canvasX, -canvasY);

  //axis lines
  context.beginPath();
  context.moveTo(-2000,0);
  context.lineTo(2000,0);
  context.moveTo(0,-1500);
  context.lineTo(0,1500);
  context.strokeStyle = 'red';
  context.lineWidth = 2;
  context.stroke();

//boundary lines
  context.beginPath();
  context.rect(-2000,-1500, 4000, 3000);
  context.strokeStyle = 'blue';
  context.lineWidth = 2;
  context.stroke();

  for(let i = 0; i < snakes.length; i++){

    snakes[i].updateSegments();
    snakes[i].render(context);
    snakes[i].checkEdges();
  }

  for(let i = 0; i<ships.length; i++){
    ships[i].update();
    ships[i].render(context);
  }

  context.restore();

  miniCtx.clearRect(0,0, canvas.width, canvas.height);

  miniCtx.save();
  miniCtx.scale(miniCanvas.width/world.width, miniCanvas.height/world.height);
  miniCtx.translate(world.width/2, world.height/2);

  for(let i = 0; i < snakes.length; i++){
    snakes[i].render(miniCtx);
  }

  for(let i = 0; i<ships.length; i++){
    ships[i].update();
    ships[i].render(miniCtx);
  }

//minimap axes
  miniCtx.beginPath();
  miniCtx.moveTo(-2000,0);
  miniCtx.lineTo(2000,0);
  miniCtx.moveTo(0,-1500);
  miniCtx.lineTo(0,1500);
  miniCtx.strokeStyle = 'red';
  miniCtx.lineWidth = 20;
  miniCtx.stroke();

//canvas outline
  miniCtx.beginPath();
  miniCtx.rect(canvasX, canvasY, canvas.width, canvas.height);
  miniCtx.strokeStyle = 'blue';
  miniCtx.lineWidth = 20;
  miniCtx.stroke();

  miniCtx.restore();

}

function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()*10)-5, (Math.random()*10)-5, 30));

    snakes[i].loadSegments(10);
  }
}

function loadShips(n){
  for(let i = 0; i<n; i++){
    ships.push(new Ship(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, (Math.random()*4)-2, (Math.random()*4)-2, (Math.random()*0.1)-0.1, (Math.random()*0.1)-0.1, Math.random()*360));

  }
}

function moveCanvas(keyPressed){

  var canvasMovementRate = 5;

  if(keyPressed.code === "KeyD"){
    canvasX += canvasMovementRate;
  }

  if(keyPressed.code === "KeyA"){
    canvasX -= canvasMovementRate;
  }

  if(keyPressed.code === "KeyS"){
    canvasY += canvasMovementRate;
  }

  if(keyPressed.code === "KeyW"){
    canvasY -= canvasMovementRate;
  }

  console.log(keyPressed);
}
