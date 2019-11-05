function Snake(x, y, rad, vx, vy, ax, ay){
  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx,vy);
  this.acc = new JSVector(ax,ay);

  this.segments = [];

  this.radius = rad;

  this.lifespan = Math.random()*1;


  this.render = function() {

    this.drawSegments();

    context.strokeStyle = 'rgba(255,255,255,'+this.lifespan+')';
    context.fillStyle = 'rgba(255,255,255,'+this.lifespan+')';
    context.beginPath();

    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
    context.stroke();
    context.fill();

  }

  this.update = function() {

    this.loc.add(this.vel);
    this.vel.add(this.acc);

    this.vel.limit(4);

    var loc = new JSVector(this.loc.x, this.loc.y);

    this.segments.push(loc);

    if(this.segments.length > 50){
      this.segments.splice(0,1);
    }



  }

  this.run = function() {

    this.update();
    this.render();
    this.checkEdges();

    this.transparency -= 0.003;

  }

  this.checkEdges = function(){
    if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
      this.vel.x = -this.vel.x;
    }

    if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
      this.vel.y = -this.vel.y;
    }
  }



  }

  this.drawSegments = function(){
    for (var i = 0; i < this.segments.length; i++){
      var pos = this.segments[i];

      context.strokeStyle = 'rgba(255,255,255,'+this.lifespan+')';
      context.fillStyle = 'rgba(255,255,255,'+this.lifespan+')';
      context.beginPath();

      context.arc(pos.x, pos.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

    }
  }

function Snake(length, color, x, y, vx, vy, radius){
  this.length = length;
  this.color = color;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = radius;
  this.tail = [];
  this.loadTailPts();
}

// loads tail[] with this.length JSVector points for the lines to be drawn at
Snake.prototype.loadTailPts = function(){
  this.tail.push(this.loc);
  for(i = 0; i < this.length; i++){
    this.tail.push(new JSVector(this.loc.x, this.loc.y));
  }
}

Snake.prototype.checkUpdateDistance = function(){
  for(let i = 0; i < this.tail.length - 1; i++){
    if(this.tail[i+1].distance(this.tail[i]) > 10){
      var newVel = this.vel;
      newVel.setDirection(this.tail[i].getDirection(this.tail[i+1]));
      newVel.normalize();
      newVel.setMagnitude(this.vel.getMagnitude());
      this.tail[i] += this.newVel;
    }
  }
}
