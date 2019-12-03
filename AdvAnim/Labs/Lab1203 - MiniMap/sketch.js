addEventListener("load", setup);
addEventListener("keydown", moveCanvas);

var canvas;
var context;

let snakes = [];

var canvasWidth = 800;
var canvasHeight = 600;

var worldWidth = 4000;
var worldHeight = 3000;


function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,1)';

  loadSnakes(5);


  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i < snakes.length; i++){

    snakes[i].run();
  }
}

function loadSnakes(numSnakes){
  for(let i = 0; i<numSnakes; i++){
    snakes.push(new Snake(Math.random()*canvas.width, Math.random()*canvas.width, (Math.random()*10)-5, (Math.random()*10)-5, 30));

    snakes[i].loadSegments(10);
  }
}

// function cloneCanvas(oldCanvas) {
//
//     //create a new canvas
//     var newCanvas = document.createElement('canvas');
//     var context = newCanvas.getContext('2d');
//
//     //set dimensions
//     newCanvas.width = oldCanvas.width;
//     newCanvas.height = oldCanvas.height;
//
//     //apply the old canvas to the new one
//     context.drawImage(oldCanvas, 0, 0);
//
//     //return the new canvas
//     return newCanvas;
// }

function moveCanvas(e){
  console.log(e);
}
