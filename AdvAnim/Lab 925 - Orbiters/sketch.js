addEventListener("load", setup);

var canvas;
var context;
var hue  = 0;

let planets  = [];

var suns = [];

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadSuns(3, 30);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i<suns.length; i++){

    for(let j = 0; j<planets.length;j++){
      planets[j].run(suns[i]);
      planets[j].connect(suns[i]);

      }

      suns[i].run();
    }


  }


function loadSuns(numSuns, numPlanetsPerSun){
  for(let i = 0; i<numSuns; i++){
    suns.push(new Sun(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, 70, Math.random()*360, (Math.random()*4)-2, (Math.random()*4)-2));

    for(let j = 0; j<numPlanetsPerSun; j++){

      planets.push(new Planet(Math.random()*(window.innerWidth-30)+30,Math.random()*(window.innerHeight-30)+30,(Math.random()*30)+15, Math.random()*200, Math.random()*360, (Math.random()*4)-2, (Math.random()*4)-2));

    }
  }
}
