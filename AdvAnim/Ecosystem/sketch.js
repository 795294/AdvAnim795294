addEventListener("load", setup);
window.addEventListener("collide", newPS);
window.addEventListener("orbiter", addNewPlanet);
addEventListener("keydown", moveCanvas);

var canvas;
var context;
var hue  = 0;

let planets  = [];
let particleSystems = [];
var suns = [];

let ships  = [];
let enemies = [];

let snakes = [];

var collideLocx;
var collideLocy;

var separate = 0;
var alignment = 0;
var cohesion = 0;
var wallRepulsion = 0;

var redFlock;
var blueFlock;

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

  loadSuns(2);

  loadPlanets(1);

  loadShips(7);

  loadRedFlock(500);

  loadBlueFlock(500);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  // for(let i = 0; i < particleSystems.length; i++){
  //
  //   if (!particleSystems[i].isDead()) {
  //     particleSystems[i].run();
  //
  //   } else {
  //     particleSystems.splice(i, 1);
  //   }
  //
  // }

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

  for(let i = 0; i<suns.length; i++){

    for(let j = 0; j<planets.length;j++){
      planets[j].update();
      planets[j].render(context)
      planets[j].orbit(suns[i]);
      planets[j].connect(suns[i]);

      }

    for(let j = 0; j<ships.length; j++){

      ships[j].update();

      ships[j].render(context);

      ships[j].attract(suns[i]);

      suns[i].checkCollision(ships[j]);

    }

    for(let j = 0; j < snakes.length; j++){

      snakes[j].updateSegments();
      snakes[j].render(context);
      snakes[j].checkEdges();
    }


    suns[i].update();
    suns[i].render(context);
    suns[i].checkEdges();
  }

  context.restore();


  //begin minimap

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

  redFlock.run();

  blueFlock.run();


  separate = document.getElementById("sep").value;
  alignment = document.getElementById("align").value;
  cohesion = document.getElementById("coh").value;
  wallRepulsion = document.getElementById("rep").value;


  }


function newPS(){

    particleSystems.push(new ParticleSystem(collideLocx, collideLocy, 0, 0, 0, 0, 10, "green"));

}


function loadSuns(numSuns){
  for(let i = 0; i<numSuns; i++){

    suns.push(new Sun(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, 10, Math.random()*360, (Math.random()*1)-0.5, (Math.random()*1)-0.5));

  }
}

function loadPlanets(numPlanetsPerSun){
  for(let i = 0; i < numPlanetsPerSun; i++){

    planets.push(new Planet(Math.random()*(window.innerWidth-30)+30,Math.random()*(window.innerHeight-30)+30,(Math.random()*4)+2, (Math.random()*50)+20, Math.random()*360));

  }
}

function addNewPlanet(){
    planets.push(new Planet(Math.random()*(window.innerWidth-30)+30,Math.random()*(window.innerHeight-30)+30,(Math.random()*4)+2, (Math.random()*50)+20, Math.random()*360));
}


function loadShips(n){
  for(let i = 0; i<n; i++){
    ships.push(new Ship(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, (Math.random()*4)-2, (Math.random()*4)-2, (Math.random()*0.1)-0.1, (Math.random()*0.1)-0.1, Math.random()*360));

  }
}

function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake(Math.random()*canvas.width, Math.random()*canvas.width, (Math.random()*10)-5, (Math.random()*10)-5, 10));

    snakes[i].loadSegments(15);
  }
}

function loadRedFlock(n){
  redFlock = new Flock();

  for(let i = 0; i < n; i++) {
    let b = new Boid(Math.random()*(canvas.width-70)+70,Math.random()*(canvas.height-70)+70, 'red', 100);
    redFlock.addRedBoid(b);
  }
}

function loadBlueFlock(n){
  blueFlock = new Flock();

  for(let i = 0; i < n; i++) {
    let b = new Boid(Math.random()*(canvas.width-70)+70,Math.random()*(canvas.height-70)+70, 'blue', 100);
    blueFlock.addBlueBoid(b);
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
