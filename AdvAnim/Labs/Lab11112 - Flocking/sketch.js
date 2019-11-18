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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  document.getElementById("sep").min=.000001;
  document.getElementById("sep").max=10;
  document.getElementById("sep").step="any";

  document.getElementById("align").min=.000001;
  document.getElementById("align").max=10;
  document.getElementById("align").step="any";

  document.getElementById("coh").min=.000001;
  document.getElementById("coh").max=10;
  document.getElementById("coh").step="any";

  document.getElementById("rep").min = 0.000001;
  document.getElementById("rep").max=10;
  document.getElementById("rep").step="any";

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
