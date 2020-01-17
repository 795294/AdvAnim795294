addEventListener("load", setup);

var canvas;
var context;

let balls  = [];

var repulsionBall;
var attractionBall;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadBalls(20);

  repulsionBall = new Ball(Math.random()*(770-30)+30,Math.random()*(770-30)+30,70,(Math.random()*2)-1,(Math.random()*2)-1,0,0);
  attractionBall = new Ball(Math.random()*(770-30)+30,Math.random()*(770-30)+30,70,(Math.random()*2)-1,(Math.random()*2)-1,0,0);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  repulsionBall.run();

  attractionBall.run();

  for(let i = 0; i<balls.length;i++){
    balls[i].run();

    balls[i].attract(attractionBall);

    balls[i].repel(repulsionBall);

    for(let j = 0; j < balls.length; j++){
      if(balls[i] != balls[j]){
        balls[i].connect(balls[j]);
      }
    }


  }


}


function loadBalls(n){
  for(let i = 0; i<n; i++){
    balls.push(new Ball(Math.random()*(770-30)+30,Math.random()*(770-30)+30,Math.random()*30,(Math.random()*4)-2,(Math.random()*4)-2,0,0));
  }
}
