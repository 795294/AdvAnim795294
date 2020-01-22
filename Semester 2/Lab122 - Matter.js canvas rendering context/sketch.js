addEventListener("load", setup);

var canvas;
var context;

var Engine;
var World;
var Bodies;
var Composite;

var engine;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 600;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Composite = Matter.Composite;

  engine = Engine.create();

  World.add(engine.world, [
    //walls
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })

  ]);

  animate();

}

function animate(){
  requestAnimationFrame(animate);

  var bodies = Composite.allBodies(engine.world);

  Engine.update(engine, 1000/60);

  context.fillStyle = 'rgb(255,0,0)';
  // context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();

  context.lineWidth = 1;
  context.strokeStyle = '#999';
  context.stroke();
}
