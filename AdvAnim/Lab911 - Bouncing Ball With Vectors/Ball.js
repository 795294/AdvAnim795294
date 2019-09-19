function Ball(x, y, rad, vx, vy, ax, ay){
  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx,vy);
  this.acc = new JSVector(ax,ay);
  this.repulsion =
  this.radius = rad;
  this.mass = this.radius*10;


  this.render = function() {

    if(this === repulsionBall){
      context.strokeStyle = 'rgb(255,0,0)';
      context.fillStyle = 'rgb(255,0,0)';
      context.beginPath();

      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

    } else if(this === attractionBall){
      context.strokeStyle = 'rgb(0,255,0)';
      context.fillStyle = 'rgb(0,255,0)';
      context.beginPath();

      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

    } else {
      context.strokeStyle = 'rgb(0,0,255)';
      context.fillStyle = 'rgb(0,0,255)';
      context.beginPath();

      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();
    }


  }

  this.update = function() {

    this.loc.add(this.vel);
    this.vel.add(this.acc);

    this.vel.limit(4);

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

  this.attract = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<200){

      var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
      attractionForce.normalize();
      attractionForce.multiply(0.5);
      this.vel.add(attractionForce);

    }


  }

  this.repel = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<500){

      var repulsuionForce = JSVector.addGetNew(v2.loc, this.loc);
      repulsuionForce.normalize();
      repulsuionForce.multiply(0.5);
      this.vel.add(repulsuionForce);

    }

  }
}
