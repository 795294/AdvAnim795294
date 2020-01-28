addEventListener("load", setup);

var canvas;
var context;

var Engine;
var World;
var Bodies;
var Composite;

var engine;
var boxA,
    boxB,
    ground;

var bodies;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 600;

  context = canvas.getContext("2d");

  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Composite = Matter.Composite;

  engine = Engine.create();

  boxA = new Box(400, 200, 80, 80);
  boxB = new Box(450, 50, 80, 80);
  ground = new Box(400, 610, 810, 60, true);

  World.add(engine.world, [boxA.box, boxB.box, ground.box]);

  animate();

}

function animate(){

  bodies = Composite.allBodies(engine.world);

  window.requestAnimationFrame(animate);

  Engine.update(engine, 1000/60);
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  //renders using vertices

  // ground.render2();
  // boxA.render2();
  // boxB.render2();

  //renders using translate and rotate

  ground.render();
  boxA.render();
  boxB.render();


  context.lineWidth = 5;
  context.strokeStyle = '#00EEFF';
  context.stroke();
}
