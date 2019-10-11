addEventListener("load", setup);

var canvas;
var context;

var particle;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  particle = new Particle(400, 400, 0, 0, 0.05, 0.05);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  particle.run();

  if(particle.isDead()){
    console.log('dead');
  }


}
