addEventListener("load", setup);

var canvas;
var context;

let snakes  = [];


function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadSnakes(20);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i<snakes.length; i++){
    snakes[i].run();
  }




}


function loadSnakes(n){
  for(let i = 0; i<n; i++){
    snakes.push(new Snake(Math.random()*(770-30)+30,Math.random()*(770-30)+30,10,(Math.random()*4)-2,(Math.random()*4)-2,0,0));
  }
}
