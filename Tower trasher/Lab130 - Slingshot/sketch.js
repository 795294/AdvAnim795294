addEventListener("load", setup);

var canvas,
    context;

var Engine,
    World,
    Bodies,
    Composite, //a collection of Matter.Body, Matter.Constraint and other Matter.Composite
    Composites, //contains methods for creating composite bodies with commonly used configurations
    Constraint,
    MouseConstraint;

var engine;

var boxA,
    boxB,
    ground;

var rock;

var bodies;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 600;

  context = canvas.getContext("2d");

  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Composite = Matter.Composite;
  Composites = Matter.Composites;
  Constraint = Matter.Constraint;
  MouseConstraint = Matter.MouseConstraint;
  Mouse = Matter.Mouse;

  engine = Engine.create();

  //add mouse control

  var mouse = Mouse.create(canvas),

  mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse, //name of mouse var comes after the colon
      constraint: {
          stiffness: 0.2,
      }
  });

  //add a mouse constraint to the world
  World.add(engine.world, [mouseConstraint]);

  boxA = new Box(400, 200, 80, 80, 'rgb(255,0,0)', false);
  boxB = new Box(450, 50, 80, 80, 'rgb(255,0,0)', false);
  ground = new Box(400, 610, 810, 60, 'rgb(0,0,255)', true);

  rock = new Polygon(170, 450, 8, 20, 'rgb(0,0,255)', false, 0.4);

  pyramid1 = new Pyramid(canvas.width/2 , canvas.height - 400, 25, 50, 9, 10);


  World.add(engine.world, [boxA.box, boxB.box, ground.box, pyramid1.pyramid, rock.poly]);

  animate();

}

function animate(){

  bodies = Composite.allBodies(engine.world);

  window.requestAnimationFrame(animate);

  context.clearRect(0,0, canvas.width, canvas.height);

  Engine.update(engine, 1000/60);

  //renders using translate and rotate

  ground.render();
  boxA.render();
  boxB.render();

  //calls run function from pyramids
  pyramid1.run();

  rock.render();
}
