addEventListener("load", setup);
window.addEventListener("collide", newPS);

var canvas;
var context;
var hue  = 0;

let planets  = [];
let particleSystems = [];
let suns = [];

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

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  loadSnakes(5);

  loadSuns(2,5);

  loadShips(7);

  loadRedFlock(500);

  loadBlueFlock(500);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i < particleSystems.length; i++){

    if (!particleSystems[i].isDead()) {
      particleSystems[i].run();

    } else {
      particleSystems.splice(i, 1);
    }

  }

  for(let i = 0; i<suns.length; i++){

    for(let j = 0; j<planets.length;j++){
      planets[j].run();
      planets[j].orbit(suns[i]);
      planets[j].connect(suns[i]);

      }

    for(let j = 0; j<ships.length; j++){

      ships[j].run();

      ships[j].attract(suns[i]);

      suns[i].checkCollision(ships[j]);

    }

    for(let j = 0; j < snakes.length; j++){

      snakes[j].run();

      snakes[j].attract(suns[i]);
    }

    suns[i].run();
  }

  redFlock.run();
  blueFlock.run();

  separate = document.getElementById("sep").value;
  alignment = document.getElementById("align").value;
  cohesion = document.getElementById("coh").value;
  wallRepulsion = document.getElementById("rep").value;


  }


function newPS(collisionEvent){

    particleSystems.push(new ParticleSystem(collideLocx, collideLocy, 0, 0, 0, 0, 10, "green"));

}


function loadSuns(numSuns, numPlanetsPerSun){
  for(let i = 0; i<numSuns; i++){
    suns.push(new Sun(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, 10, Math.random()*360, (Math.random()*1)-0.5, (Math.random()*1)-0.5));

    for(let j = 0; j<numPlanetsPerSun; j++){

      planets.push(new Planet(Math.random()*(window.innerWidth-30)+30,Math.random()*(window.innerHeight-30)+30,(Math.random()*4)+2, (Math.random()*50)+20, Math.random()*360));

    }
  }
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
    let b = new Boid(Math.random()*(canvas.width-70)+70,Math.random()*(canvas.height-70)+70, 'red');
    redFlock.addRedBoid(b);
  }
}

function loadBlueFlock(n){
  blueFlock = new Flock();

  for(let i = 0; i < n; i++) {
    let b = new Boid(Math.random()*(canvas.width-70)+70,Math.random()*(canvas.height-70)+70, 'blue');
    blueFlock.addBlueBoid(b);
  }
}
