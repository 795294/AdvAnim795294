addEventListener("load", setup);

var canvas;
var context;

let ships  = [];
let enemies = [];

function setup(){
  canvas = document.getElementById("cnv");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");

  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0,0.5)';

  loadShips(5);
  loadEnemies(1);

  draw();

}

function draw(){
  requestAnimationFrame(draw);

  context.clearRect(0,0, canvas.width, canvas.height);

  for(let i = 0; i<ships.length; i++){
      ships[i].run();

      for(let j = 0; j<enemies.length; j++){
          enemies[j].run(ships[i]);
          enemies[j].isColliding(ships[i]);
        }
    }

  }


function loadShips(n){
  for(let i = 0; i<n; i++){
    ships.push(new Ship(Math.random()*(window.innerWidth-70)+70,Math.random()*(window.innerHeight-70)+70, (Math.random()*4)-2, (Math.random()*4)-2, (Math.random()*0.1)-0.1, (Math.random()*0.1)-0.1, Math.random()*360));

  }
}

function loadEnemies(n){
  for(let i = 0; i<n; i++){
    enemies.push(new Enemy(400, 400, 70, Math.random()*360));
  }
}
