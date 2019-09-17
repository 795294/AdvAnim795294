function Ball(x, y, rad, vx, vy, ax, ay){
  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx,vy);
  this.acc = new JSVector(ax,ay);
  this.radius = rad;
  this.mass = this.radius*10;


  this.render = function() {



    context.strokeStyle = 'rgb(255,0,0)';
    context.fillStyle = 'rgb(255,0,0)';
    context.beginPath();

    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
    context.stroke();
    context.fill();


  }

  this.update = function() {



    this.loc.add(this.vel);
    this.vel.add(this.acc);

    if(this.isColliding(v2)){
      this.vel = ((this.mass-v2.mass)/(this.mass+v2.mass))*this.vel + ((2*v2.mass)/(this.mass+v2.mass))*v2.vel;

      v2.vel = (2*this.mass)/(this.mass+v2.mass))*this.vel + ((2*v2.mass)/(this.mass+v2.mass))*v2.vel;
    }

  }

  this.run = function() {

    this.update();
    this.render();
    this.checkEdges();

  }

  this.checkEdges = function(){
    if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
      this.vel.x = -this.vel.x;
    }

    if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
      this.vel.y = -this.vel.y;
    }
  }

  this.connect = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<100){

      context.lineWidth = 2;
      context.strokeStyle = 'rgb(0,100,100)';
      context.moveTo(this.loc.x, this.loc.y);
      context.lineTo(v2.loc.x, v2.loc.y);
      context.stroke();

    }
  }

  this.isColliding = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<this.radius*2){
      return true;
    }

  }


}
