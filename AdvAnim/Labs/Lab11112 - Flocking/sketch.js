addEventListener("load", setup);

var canvas;
var context;

let boids  = [];

let flock;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  flock = new Flock();

  for(let i = 0; i< 100; i++) {
    let b = new Boid(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, Math.random()*360);
    flock.addBoid(b);
  }

  draw();

}

function draw(){

  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  flock.run();

}
