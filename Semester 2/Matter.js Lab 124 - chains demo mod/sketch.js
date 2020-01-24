addEventListener("load", run);

function run(){
  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'rgb(50,0,0)',
        showAngleIndicator: true

      }
  });

  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
      fillStyle: 'rgb(255,0,0)',
      strokeStyle: 'rgb(0,0,100)',
      lineWidth: 3
    }
  });

  var boxB = Bodies.rectangle(450, 50, 80, 80);

var ballA = Bodies.circle(100,100, 40,{
  render: {
    fillStyle: 'rgb(0,255,0)',
    strokeStyle: 'rgb(0,0,100)',
    lineWidth: 3
  }
});
  var group = Matter.Body.nextGroup(true);

  var ropeA = Matter.Composites.stack(100, 50, 8, 1, 10, 10, function(x, y) {
       return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
   });

   Matter.Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
   Matter.Composite.add(ropeA, Matter.Constraint.create({
       bodyB: ropeA.bodies[0],
       pointB: { x: -25, y: 0 },
       pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
       stiffness: 0.5
   }));

   Matter.Composite.add(ropeA, Matter.Constraint.create({
       bodyB: ropeA.bodies[0],
       pointB: { x: -25, y: 0 },
       pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
       stiffness: 0.5
   }));

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ballA, ropeA]);

  World.add(engine.world, [
    //walls
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })

  ]);




  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

}
