function Boid(x, y, hue){

  this.loc = new JSVector(x,y);
  this.vel = new JSVector((Math.random()*2)-1, (Math.random()*2)-1);
  this.acc = new JSVector(0, 0);
  this.hue = hue;
  this.maxspeed = 5;
  this.maxforce = 0.1;

  this.render = function() {

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
      context.moveTo(-9/2, -12/2);
      context.lineTo(0,15/2);
      context.moveTo(0,15/2);
      context.lineTo(9/2,-12/2);
      context.moveTo(9/2,-12/2);
      context.lineTo(-9/2,-12/2);

      context.restore();

  }

  this.update = function() {

      this.vel.add(this.acc);

      this.loc.add(this.vel);

      this.vel.limit(this.maxspeed);

      this.acc.multiply(0);
  }

  this.run = function(boids) {

    this.flock(boids);
    this.render();
    this.update();
    this.checkEdges();

  }

  this.applyForce = function(force){
    this.acc.add(force);
  }
//force accumulation
  this.flock = function(boids){
    let sepForce = this.separate(boids);
    let aliForce = this.align(boids);
    let cohForce = this.cohesion(boids);
    //arbitrary multipliers
    sepForce.multiply(1.5);
    aliForce.multiply(1.0);
    cohForce.multiply(1.0);

    this.applyForce(sepForce);
    this.applyForce(aliForce);
    this.applyForce(cohForce);
  }

  this.checkEdges = function(){
    if (this.loc.x < 100) {
      let desired = new JSVector(this.maxspeed,this.vel.y);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*10);
      this.applyForce(steer);
    }

    if (this.loc.x > window.innerWidth - 100) {
      let desired = new JSVector(-this.maxspeed,this.vel.y);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*10);
      this.applyForce(steer);
    }

    if (this.loc.y < 100) {
      let desired = new JSVector(this.vel.x, this.maxspeed);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*10);
      this.applyForce(steer);
    }

    if (this.loc.y > window.innerHeight - 100) {
      let desired = new JSVector(this.vel.x, -this.maxspeed);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*10);
      this.applyForce(steer);
    }
  }

  this.seek = function(target){
    let desired = JSVector.subGetNew(target,this.loc);
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.multiply(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }

  this.separate = function(boids){
    let desiredSeparation = 25.0;
    let steer = new JSVector(0, 0);
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      let d = this.loc.distance(boids[i].loc);

      if ((d > 0) && (d < desiredSeparation)) {

        let diff = JSVector.subGetNew(this.loc, boids[i].loc);
        diff.normalize();
        diff.divide(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.divide(count);
    }


    if (steer.getMagnitude() > 0) {

      steer.normalize();
      steer.multiply(this.maxspeed);
      steer.sub(this.vel);
      steer.limit(this.maxforce);
    }
      return steer;
    }

  this.align = function(boids){
    let neighbordist = 50;
    let sum = new JSVector(0,0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = this.loc.distance(boids[i].loc);

      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].vel);
        count++;
      }
    }
    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxspeed);
      let steer = JSVector.subGetNew(sum, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return new JSVector(0, 0);
    }
  }

  this.cohesion = function(boids){
    let neighbordist = 50;

    let sum = new JSVector(0,0);

    let count = 0;

    for(let i = 0; i < boids.length; i++){
      let d = this.loc.distance(boids[i].loc);

      if((d > 0) && (d < neighbordist)){
        sum.add(boids[i].loc);
        count++;
      }
    }

    if(count > 0){
      sum.divide(count);
      return this.seek(sum);
    } else {
      return new JSVector(0,0);
    }
  }


}
