function Ball(x, y, rad, vx, vy, ax, ay){
  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx,vy);
  this.acc = new JSVector(ax,ay);
  this.radius = rad;
  

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


}
