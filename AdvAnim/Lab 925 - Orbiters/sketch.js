addEventListener("load", setup);

var canvas;
var context;
var hue  = 0;

let planets  = [];

var suns = [];

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = 800;
  canvas.height = 800;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadPlanets(30);

  loadSuns(2);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i<suns.length; i++){

    for(let j = 0; j<planets.length;j++){
      planets[j].run();
      planets[j].orbit(suns[i]);
      planets[j].connect(suns[i]);

      }

      suns[i].run();
    }


  }



function loadPlanets(n){
  for(let i = 0; i<n; i++){

    planets.push(new Planet(Math.random()*(770-30)+30,Math.random()*(770-30)+30,(Math.random()*30)+15, (Math.random()*200)+100, Math.random()*360, (Math.random()*4)-2, (Math.random()*4)-2));

  }
}

function loadSuns(n){
  for(let i = 0; i<n; i++){
    suns.push(new Sun(400, 400, 70, Math.random()*360, (Math.random()*4)-2, (Math.random()*4)-2));
  }
}
