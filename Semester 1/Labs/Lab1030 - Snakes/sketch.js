addEventListener("load", setup);

var canvas;
var context;

let snakes = [];


function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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
}

function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake(Math.random()*canvas.width, Math.random()*canvas.width, (Math.random()*10)-5, (Math.random()*10)-5, 30));

    snakes[i].loadSegments(10);
  }
}
