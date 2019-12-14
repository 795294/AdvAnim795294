function Snake(x, y, vx, vy, radius){
  this.loc = new JSVector(x, y);
  this.initialVelocity = new JSVector(vx, vy);
  this.newVector = new JSVector();
  this.acc = new JSVector(0,0);

  this.mag = this.initialVelocity.getMagnitude();
  this.radius = radius;
  this.segments = [];
  this.velocities = [];

  this.lineWidth = 30;

  this.transparency = 1;

  this.r = 3.0;
  this.wanderRadius = 200;

  this.maxforce = 4;
  this.maxspeed = 2;

  this.render = function(context) {

    context.strokeStyle = 'rgba(0,0,255,'+this.transparency+')';
    context.fillStyle = 'rgba(0,0,255,'+this.transparency+')';
    context.beginPath();
    context.arc(this.segments[0].x, this.segments[0].y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();

    for(let i = 1; i < this.segments.length; i++){

      context.strokeStyle = 'rgba(255,255,255,'+(this.transparency-i*0.05)+')';
      context.fillStyle = 'rgba(255,255,255,'+(this.transparency-i*0.05)+')';

      context.lineWidth = this.lineWidth-(i*1.5);

      context.lineCap = 'round';

      context.beginPath();
      context.moveTo(this.segments[i-1].x, this.segments[i-1].y);
      context.lineTo(this.segments[i].x, this.segments[i].y);
      context.fill();
      context.stroke();

    }

  }

  this.run = function() {

    this.updateSegments();

    this.render();

    this.checkEdges();

  }

  this.loadSegments = function(n){
    for(let i = 0; i < n; i++){
      this.segments.push(new JSVector(this.loc.x, this.loc.y));

      this.velocities.push(new JSVector(this.initialVelocity.x, this.initialVelocity.y));
    }
  }

  this.updateSegments = function(){

    this.initialVelocity.add(this.acc);

    this.acc.multiply(0);

    this.segments[0].add(this.initialVelocity);

    this.initialVelocity.limit(this.maxspeed);

    for(let i = 1; i < this.segments.length; i++){
      if(this.segments[i].distance(this.segments[i-1]) > this.radius){

        this.newVector = JSVector.subGetNew(this.segments[i], this.segments[i-1]);

        this.newVector.setMagnitude(this.mag);

        this.segments[i] = this.segments[i].sub(this.newVector);

      }
    }
  }


  this.checkEdges = function(){
    if(this.segments[0].x + this.radius > world.width/2 || this.segments[0].x - this.radius < -world.width/2){
      this.initialVelocity.x = -this.initialVelocity.x;
    }

    if(this.segments[0].y + this.radius > world.height/2 || this.segments[0].y - this.radius < -world.height/2){
      this.initialVelocity.y = -this.initialVelocity.y;
    }
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

    let steer = JSVector.subGetNew(desired, this.initialVelocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);

  }

}
