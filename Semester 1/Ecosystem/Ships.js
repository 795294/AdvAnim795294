function Ship(x, y, vx, vy, ax, ay, hue){

  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay)
  this.hue = hue;

  this.r = 3.0;
  this.wanderRadius = 200;

  this.maxforce = 4;
  this.maxspeed = 2;

  this.scale = 5;

  this.render = function(context) {

      this.hue ++;

      if(this.hue>360){
        hue = 0;
      }

      context.lineWidth = 2;
      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
      context.stroke();

      context.save();

      context.translate(this.loc.x, this.loc.y);
      this.angle = this.vel.getDirection();
      context.rotate(this.angle - Math.PI/2);
      context.beginPath();
      context.moveTo(-9, -12);
      context.lineTo(0,15);
      context.moveTo(0,15);
      context.lineTo(9,-12);
      context.moveTo(9,-12);
      context.lineTo(-9,-12);

      context.restore();

  }

  this.update = function() {

      this.loc.add(this.vel);

      this.vel.limit(this.maxspeed);

      this.vel.add(this.acc);

      this.acc.multiply(0);
  }

  this.run = function() {

    this.render();
    this.update();
    this.checkEdges();

  }

  this.attract = function(suns){

      var d = this.loc.distance(suns.loc);

      if(d < 500){
        var attractionForce = JSVector.subGetNew(suns.loc, this.loc);
        attractionForce.normalize();
        attractionForce.multiply(0.5);
        this.vel.add(attractionForce);
      }


  }

  this.checkEdges = function() {
      if(this.loc.x > world.width/2 || this.loc.x  < -world.width/2){
        this.vel.x = -this.vel.x;
      }

      if(this.loc.y  > world.height/2 || this.loc.y  < -world.height/2){
        this.vel.y = -this.vel.y;
      }
  }

  this.wander = function() {

    let angle = Math.random()*(Math.PI*2);
    let newX = this.wanderRadius*this.scale * Math.cos(angle);
    let newY = this.wanderRadius*this.scale * Math.sin(angle);
    let targetLoc = new JSVector(newX, newY);

    let desired = JSVector.subGetNew(targetLoc, this.loc);

    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);

  }

  this.applyForce = function(force) {

    this.acc.add(force);
  }
}
