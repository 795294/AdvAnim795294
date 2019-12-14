addEventListener("load", setup);

var canvas;
var context;

let boids  = [];

let flock;

var separate = 0;
var alignment = 0;
var cohesion = 0;
var wallRepulsion = 0;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  flock = new Flock();

  for(let i = 0; i < 500; i++) {
    let b = new Boid(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, Math.random()*360);
    flock.addBoid(b);
  }

  draw();

}

function draw(){

  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  flock.run();

  separate = document.getElementById("sep").value;
  alignment = document.getElementById("align").value;
  cohesion = document.getElementById("coh").value;
  wallRepulsion = document.getElementById("rep").value;



}
