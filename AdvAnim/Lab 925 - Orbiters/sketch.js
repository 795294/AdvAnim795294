addEventListener("load", setup);

var canvas;
var context;

let planets  = [];

var sun;

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadPlanets(1);

  sun = new Planet(400, 400, 70, 0, 'rgb(0,255,0)');

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  sun.run();


  for(let i = 0; i<planets.length;i++){
    planets[i].run();
    planets[i].orbit(sun);
    }


  }



function loadPlanets(n){
  for(let i = 0; i<n; i++){


    planets.push(new Planet(Math.random()*(770-30)+30,Math.random()*(770-30)+30,Math.random()*30, 100, 'rgb(0,255,0)'));

  }
}
