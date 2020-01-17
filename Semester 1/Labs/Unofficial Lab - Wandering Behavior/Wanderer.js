
function Vehicle(x, y) {

    this.acc = new JSVector(0,0);
    this.vel = new JSVector(0,0);
    this.loc = new JSVector(x,y);

    this.r = 3.0;
    this.wanderRadius = 200;

    this.maxforce = 4;
    this.maxspeed = 5;

    this.update = function() {

      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.loc.add(this.vel);

      this.acc.multiply(0);
    }

    this.applyForce = function(force) {

      this.acc.add(force);
    }

  this.wander = function() { //from nature of code

    let angle = Math.random()*(Math.PI*2);
    let newX = this.wanderRadius*2 * Math.cos(angle);
    let newY = this.wanderRadius*2 * Math.sin(angle);
    let targetLoc = new JSVector(newX, newY);

    let desired = JSVector.subGetNew(targetLoc, this.loc);

    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);

  }

  this.render = function() {

    context.lineWidth = 2;
    context.strokeStyle =  'red';
    context.fillStyle =  'red';

    context.save();

    context.translate(this.loc.x, this.loc.y);
    let angle = this.vel.getDirection();
    context.rotate(angle - Math.PI/2);
    context.beginPath();
    context.moveTo(-9, -12);
    context.lineTo(0,15);
    context.lineTo(9,-12);
    context.lineTo(-9,-12);

    context.closePath();

    context.stroke();
    context.fill();

    context.restore();
  }

}
