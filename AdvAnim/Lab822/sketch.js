addEventListener("load", init);

var canvas;
var context;

function init() {
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  animate();
}

  var x, y, dx, dy, radius;
  x = Math.random()*800;
  y = Math.random()*800;
  dx = 5-Math.random()*10;
  dy = 5-Math.random()*10;
  radius = 30;

function animate() {

  requestAnimationFrame(animate);

  context.clearRect(0,0, canvas.width, canvas.height);

  context.strokeStyle = 'red';
  context.fillStyle = 'red';
  context.beginPath();

  context.arc(x, y, radius, 0, Math.PI*2, true);
  context.stroke();
  context.fill();

  x += dx;
  y += dy;

  if(x + radius> 800 || x- radius<0){
    dx = -dx;
  }

  if(y + radius> 800 || y - radius<0){
    dy = -dy;
  }

}
