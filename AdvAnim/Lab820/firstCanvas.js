window.onload = init;
var cnv;
var ctx;

function init(){

  cnv = document.getElementById('cnv');

  cnv.width = 800;
  cnv.height = 800;

  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,0,0,0.5)';

  ctx = cnv.getContext('2d');

  animate();

}

var x, y, radius;

x = Math.random()*cnv.width;
y = Math.random()*cnv.height;
radius = 30;


function animate() {

  requestAnimationFrame(animate);

  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'blue';

  ctx.beginPath();

  ctx.arc(x, y, radius, Math.PI*2, 0, false);
  ctx.fill();
  ctx.stroke();



}
