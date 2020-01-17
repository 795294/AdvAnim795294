addEventListener("load", setup);

var canvas;
var context;

let v;
let count = 0;

function setup() {
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  v = new Vehicle(canvas.width/2, canvas.height/2);

  draw();
}

function draw() {

  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  count++;

  if(count%50 === 0){
    v.wander();
  }
  v.update();
  v.render();

}
