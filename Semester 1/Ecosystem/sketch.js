addEventListener("load", setup);
addEventListener("collide", newPS);
addEventListener("orbiter", addNewPlanet);
addEventListener("keydown", moveCanvas);
addEventListener("blue", addBlueBoids);
addEventListener("red", addRedBoids);

var canvas;
var context;
var hue  = 0;

let planets  = [];
let particleSystems = [];
var suns = [];

let ships  = [];
let enemies = [];

let snakes = [];

let ballsBlue = [];
let ballsRed = [];

var collideLocx;
var collideLocy;

var connectLocx;
var connectLocy;

var boidCollision = new JSVector(0, 0);

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

var count = 0;
var wanderCount = 0;

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

  loadSnakes(20);

  loadSuns(10);

  loadPlanets(1);

  loadShips(20);

  loadRedFlock(500);

  loadBlueFlock(500);

  loadBlueBalls(10);

  loadRedBalls(10);

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

  for(let i = 0; i<ballsRed.length; i++){
    ballsRed[i].update();
    ballsRed[i].render(context);
    ballsRed[i].checkEdges();

    for(let j = 0; j< ballsRed.length; j++){
      if(ballsRed[i] != ballsRed[j]){
        ballsRed[i].connect(ballsRed[j], context);
      }
    }
  }

  for(let i = 0; i<ballsBlue.length; i++){
    ballsBlue[i].update();
    ballsBlue[i].render(context);
    ballsBlue[i].checkEdges();

    for(let j = 0; j< ballsBlue.length; j++){
      if(ballsBlue[i] != ballsBlue[j]){
        ballsBlue[i].connect(ballsBlue[j], context);
      }
    }
  }

  for(let i = 0; i<ships.length; i++){
    ships[i].update();
    ships[i].render(context);
  }

  wanderCount++;

  for(let i = 0; i < snakes.length; i++){
    snakes[i].updateSegments();
    snakes[i].render(context);
    snakes[i].checkEdges();

    //snakes[i].wander();
  }

  for(let i = 0; i<planets.length; i++){
    planets[i].update();
  }

  for(let i = 0; i<suns.length; i++){

    for(let j = 0; j<planets.length;j++){
      planets[j].render(context);
      planets[j].orbit(suns[i]);
      planets[j].connect(suns[i], context);
    }

    for(let j = 0; j<ships.length; j++){
      ships[j].attract(suns[i]);
      suns[i].checkCollision(ships[j]);

      if(ships[j].loc.distance(suns[i].loc) > 500 && wanderCount%400 === 0){
        ships[i].wander();
      }
    }

    suns[i].render(context);
    suns[i].update();
    suns[i].checkEdges();
  }

  for(let i = 0; i < particleSystems.length; i++){

    if (!particleSystems[i].isDead()) {

      particleSystems[i].update(context);

    } else {
      particleSystems.splice(i, 1);
    }

  }

  redFlock.run();

  blueFlock.run();

  context.restore();


  //begin minimap

  miniCtx.clearRect(0,0, canvas.width, canvas.height);

  miniCtx.save();
  miniCtx.scale(miniCanvas.width/world.width, miniCanvas.height/world.height);
  miniCtx.translate(world.width/2, world.height/2);

  //re-render everything in minimap drawing context

  for(let i = 0; i<ballsRed.length; i++){
    ballsRed[i].render(miniCtx);

    for(let j = 0; j< ballsRed.length; j++){
      if(ballsRed[i] != ballsRed[j]){
        ballsRed[i].connect(ballsRed[j], miniCtx);
      }
    }
  }

  for(let i = 0; i<ballsBlue.length; i++){
    ballsBlue[i].render(miniCtx);

    for(let j = 0; j< ballsBlue.length; j++){
      if(ballsBlue[i] != ballsBlue[j]){
        ballsBlue[i].connect(ballsBlue[j], miniCtx);
      }
    }
  }

  for(let i = 0; i<ships.length; i++){
    ships[i].render(miniCtx);
  }

  for(let i = 0; i < snakes.length; i++){
    snakes[i].render(miniCtx);
  }

  for(let i = 0; i<suns.length; i++){

    for(let j = 0; j<planets.length;j++){
      planets[j].render(miniCtx);
      planets[j].orbit(suns[i]);
      planets[j].connect(suns[i], miniCtx);
    }

    suns[i].render(miniCtx);
  }

  for(let i = 0; i< blueFlock.boidsBlue.length; i++){
    miniCtx.beginPath();
    miniCtx.strokeStyle = 'blue';
    miniCtx.fillStyle = 'blue';
    miniCtx.arc(blueFlock.boidsBlue[i].loc.x, blueFlock.boidsBlue[i].loc.y, 5, 0, Math.PI*2, true);
    miniCtx.stroke();
    miniCtx.fill();
  }

  for(let i = 0; i< redFlock.boidsRed.length; i++){
    miniCtx.beginPath();
    miniCtx.strokeStyle = 'red';
    miniCtx.fillStyle = 'red';
    miniCtx.arc(redFlock.boidsRed[i].loc.x, redFlock.boidsRed[i].loc.y, 5, 0, Math.PI*2, true);
    miniCtx.stroke();
    miniCtx.fill();
  }

//minimap axes
  miniCtx.beginPath();
  miniCtx.moveTo(-2000,0);
  miniCtx.lineTo(2000,0);
  miniCtx.moveTo(0,-1500);
  miniCtx.lineTo(0,1500);
  miniCtx.strokeStyle = 'rgb(255, 133, 51)';
  miniCtx.lineWidth = 10;
  miniCtx.stroke();

//canvas outline
  miniCtx.beginPath();
  miniCtx.rect(canvasX, canvasY, canvas.width, canvas.height);
  miniCtx.strokeStyle = 'green';
  miniCtx.lineWidth = 10;
  miniCtx.stroke();

  miniCtx.restore();


  separate = document.getElementById("sep").value;
  alignment = document.getElementById("align").value;
  cohesion = document.getElementById("coh").value;
  wallRepulsion = document.getElementById("rep").value;


  }


function newPS(){

    particleSystems.push(new ParticleSystem(collideLocx, collideLocy, 0, 0, 0, 0, 10, "green"));

}

//x, y, rad, hue, vx, vy
function loadSuns(numSuns){
  for(let i = 0; i<numSuns; i++){

    suns.push(new Sun((Math.random()*world.width)-world.width/2,(Math.random()*world.height)-world.height/2, 20, Math.random()*360, (Math.random()*1)-0.5, (Math.random()*1)-0.5));
  }
}

//x, y, rad, or, hue, angle, av
function loadPlanets(numPlanetsPerSun){
  for(let i = 0; i < numPlanetsPerSun; i++){

    planets.push(new Planet((Math.random()*world.width)-world.width/2,(Math.random()*world.height)-world.height/2,(Math.random()*10)+5, (Math.random()*50)+30, Math.random()*360, Math.random()*360, Math.random()*0.05));

  }
}

//x, y, rad, or, hue, angle, av
function addNewPlanet(){
    planets.push(new Planet((Math.random()*world.width)-world.width/2,(Math.random()*world.height)-world.height/2,(Math.random()*10)+5, (Math.random()*50)+30, Math.random()*360, Math.random()*360, Math.random()*0.05));
}

//x, y, vx, vy, ax, ay, hue
function loadShips(n){
  for(let i = 0; i<n; i++){
    ships.push(new Ship((Math.random()*world.width)-world.width/2,(Math.random()*world.height)-world.height/2, (Math.random()*4)-2, (Math.random()*4)-2, (Math.random()*0.1)-0.1, (Math.random()*0.1)-0.1, Math.random()*360));

  }
}

//x, y, vx, vy, radius, hue
function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake((Math.random()*world.width)-world.width/2, (Math.random()*world.height)-world.height/2, (Math.random()*4)-2, (Math.random()*4)-2, 20, 0));

    snakes[i].loadSegments(20);
  }
}

function loadRedFlock(n){
  redFlock = new Flock();

  for(let i = 0; i < n; i++) {
    let b = new Boid((Math.random()*world.width)-world.width/2,(Math.random()*world.height)-world.height/2, 'red', 100);
    redFlock.addRedBoid(b);
  }
}

function loadBlueFlock(n){
  blueFlock = new Flock();

  for(let i = 0; i < n; i++) {
    let b = new Boid((Math.random()*world.width)-world.width/2,(Math.random()*world.height)-world.height/2, 'blue', 100);
    blueFlock.addBlueBoid(b);
  }
}

//x, y, rad, vx, vy, ax, ay, clr
function loadBlueBalls(numBalls){
  for(let i = 0; i<numBalls; i++){
    ballsBlue.push(new Ball((Math.random()*world.width)-world.width/2, (Math.random()*world.height)-world.height/2, 30, (Math.random()*10)-5, (Math.random()*10)-5, 'blue'));

  }
}

function loadRedBalls(numBalls){

  for(let i = 0; i<numBalls; i++){
    ballsRed.push(new Ball((Math.random()*world.width)-world.width/2, (Math.random()*world.height)-world.height/2, 30, (Math.random()*10)-5, (Math.random()*10)-5, 'red'));

  }
}

function addRedBoids(){
    let b = new Boid(connectLocx, connectLocy, 'red', 100);

    count++;

    if(count%10 === 0){
      redFlock.addRedBoid(b);
    }
}

function addBlueBoids(){
    let b = new Boid(connectLocx, connectLocy, 'blue', 100);

    count++;

    if(count%10 === 0){
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

}
