addEventListener("load", setup);

var canvas;
var context;
//++++++++++++++++++++  Declare Matter and shape variables as global
var Engine,
    World,
    Bodies,
    Body,
    Composite,
    Composites,
    Events,
    Vector,
    Constraint,
    MouseConstraint,
    Mouse;

var mouseConstraintVar,
    mouseVar;

var engine;

var ground,
    pyramid1,
    slingshot

let rocks = [];

function setup(){
  canvas = document.getElementById("cnv");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  canvas.style.backgroundColor = "rgb(135,206,250)";

  context = canvas.getContext("2d");
  //++++++++++++++++++++++++  Init Matter variables
  Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Vector = Matter.Vector,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

  //Create the physics engine
  engine = Engine.create();

  // // add mouse control
  mouseVar = Mouse.create(canvas),
  mouseConstraintVar = MouseConstraint.create(engine, {
      mouse: mouseVar,
      constraint: {
          stiffness: 0.2,
      }
  });
  //add a mouse constraint to the world in order to lock objects to mouse when clicked
  World.add(engine.world, [mouseConstraintVar]);

  ground = new Box(canvas.width/2, canvas.height - 120, canvas.width + 50, 240, 'rgb(0,0,255', true);

  slingshot = new Slingshot(170, 430);

  pyramid1 = new Pyramid(canvas.width/2 + 310, canvas.height - 500, 25, 40, 9, 10);

  // add engine.World and all of the bodies to the world
  World.add(engine.world, [ground.box, pyramid1.pyramid, slingshot]);

  render();

  //add new rock to rocks[] and world after a rock released from slingshot
  Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraintVar.mouse.button === -1 && (slingshot.rock.position.x > slingshot.x + 20 || slingshot.rock.position.y < slingshot.y - 20)) {
        slingshot.onRelease();
    }
  });
}

//distance formula
function distance(xOne, yOne, xTwo, yTwo){
  return Math.sqrt((xOne-xTwo)*(xOne-xTwo) + (yOne-yTwo)*(yOne-yTwo));
}

function render(){
  // console.log(boxA.newRect.angularSpeed)
  window.requestAnimationFrame(render);

  context.clearRect(0,0, canvas.width, canvas.height);


  Engine.update(engine, 1000/60);

  context.beginPath();
  context.fillStyle = "rgb(12, 12, 12)";
  ground.render();

  //draw circle on anchor
  context.beginPath();
  context.fillStyle = "red";
  context.arc(slingshot.anchor.x, slingshot.anchor.y, 9, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();

  //calls run function from pyramids
  pyramid1.run();

  //loop through rocks[] and draw each one
  for(let i = 0; i < rocks.length; i++){
    drawPolygon(rocks[i]);
  }

  //draw line from anchor to rock connected to it
  context.beginPath();
  context.strokeStyle = "black 20px";
  context.moveTo(slingshot.anchor.x, slingshot.anchor.y);
  context.lineTo(rocks[rocks.length-1].position.x, rocks[rocks.length-1].position.y)
  context.stroke();

}
