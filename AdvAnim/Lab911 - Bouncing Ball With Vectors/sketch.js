addEventListener("load", setup);

var canvas;
var context;

let balls  = [];

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  draw();

  loadBalls(50);



}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i<balls.length;i++){

    balls[i].run();
  }


}


function loadBalls(n){
  for(let i = 0; i<n; i++){
    balls.push(new Ball(Math.random()*(770-30)+30,Math.random()*(770-30)+30,30,Math.random()*4,2,0,0.05));
  }
}
