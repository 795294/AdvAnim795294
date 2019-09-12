addEventListener("load", setup);

var canvas;
var context;


var loc = new JSVector(100,100);
var vel = new JSVector(2,2);
var acc = new JSVector(0,0.05);
var radius = 30;

let balls = [];


function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadBalls(50);

}

function draw(){
  for(let i = 0; i < balls.length; i++){

    requestAnimationFrame(draw);

    context.clearRect(0,0, canvas.width, canvas.height);

    context.strokeStyle = 'red';
    context.fillStyle = 'red';
    context.beginPath();

    context.arc(loc.x, loc.y, radius, 0, Math.PI*2, true);
    context.stroke();
    context.fill();

    loc.add(vel);
    vel.add(acc);

    checkEdges();

  }

}

function checkEdges(){
  if(loc.x + radius > canvas.width || loc.x - radius < 0){
    vel.x = -vel.x;
  }

  if(loc.y + radius > canvas.height || loc.y - radius < 0){
    vel.y = -vel.y;
  }
}

function loadBalls(n){
  for(let i = 0; i < n; i++){
    draw();
  }
}
