addEventListener("load", setup);

var canvas;
var context;

let particles = [];

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadParticleSystems(3);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(var i = 0; i<particles.length; i++){
    particles[i].run();
  }


}

function loadParticleSystems(n){
  for(var i = 0; i<n; i++){
    particles.push(new ParticleSystem(400,400,0,0,0,0,30,"green"));
  }
}
