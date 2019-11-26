function Boid(x, y, type, oR){

  this.loc = new JSVector(x,y);
  this.vel = new JSVector((Math.random()*1)-0.5, (Math.random()*1)-0.5);
  this.acc = new JSVector(0, 0);
  this.hue = hue;
  this.maxspeed = 3;
  this.maxforce = 0.1;
  this.type = type;
  this.scale = 10;

  this.planet = null;
  this.rotator = 0;
  this.orbRadius = 100;
  this.isEaten = false;

  this.eatCount = 0;

  this.render = function() {

    if(this.type === 'red'){

      context.lineWidth = 2;
      context.strokeStyle =  'red';
      context.fillStyle =  'red';

      context.save();

      context.translate(this.loc.x, this.loc.y);
      this.angle = this.vel.getDirection();
      context.rotate(this.angle - Math.PI/2);
      context.beginPath();
      context.moveTo(-9/this.scale, -12/this.scale);
      context.lineTo(0,15/this.scale);
      context.lineTo(9/this.scale,-12/this.scale);
      context.lineTo(-9/this.scale,-12/this.scale);

      context.closePath();

      context.stroke();
      context.fill();

      context.restore();
    }

    if(this.type === 'blue'){
      context.lineWidth = 2;
      context.strokeStyle =  'blue';
      context.fillStyle =  'blue';

      context.save();

      context.translate(this.loc.x, this.loc.y);
      this.angle = this.vel.getDirection();
      context.rotate(this.angle - Math.PI/2);
      context.beginPath();
      context.moveTo(-9/this.scale, -12/this.scale);
      context.lineTo(0,15/this.scale);
      context.lineTo(9/this.scale,-12/this.scale);
      context.lineTo(-9/this.scale,-12/this.scale);

      context.closePath();

      context.stroke();
      context.fill();

      context.restore();

    }

  }

  this.update = function() {

      this.vel.add(this.acc);

      this.loc.add(this.vel);

      this.vel.limit(this.maxspeed);

      this.acc.multiply(0);
  }

  this.run = function(boids) {

    this.checkOrbit();

    this.flock(boids);
    this.render();


    if(!this.planet){
      this.update();
      this.checkEdges();
    } else {
      if(this.loc.distance(this.planet.loc) < this.orbRadius + this.planet.radius){
        context.lineWidth = 1;
        //context.strokeStyle = this.color;
        context.moveTo(this.planet.loc.x, this.planet.loc.y);
        context.lineTo(this.loc.x, this.loc.y);
        context.stroke();
      }

      this.eat(this.planet);
      this.update();

      if(this.loc.distance(this.planet.loc) < this.planet.radius){
        this.isEaten = true;

        this.eatCount++;

      }
    }


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
      let desired = new JSVector(wallRepulsion,this.vel.y);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*1.5);
      this.applyForce(steer);
    }

    if (this.loc.x > canvas.width - 100) {
      let desired = new JSVector(-wallRepulsion,this.vel.y);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*1.5);
      this.applyForce(steer);
    }

    if (this.loc.y < 100) {
      let desired = new JSVector(this.vel.x, wallRepulsion);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*1.5);
      this.applyForce(steer);
    }

    if (this.loc.y > canvas.height - 100) {
      let desired = new JSVector(this.vel.x, -wallRepulsion);
      let steer = JSVector.subGetNew(desired, this.vel);

      steer.limit(this.maxforce*1.5);
      this.applyForce(steer);
    }
  }

  this.seek = function(target){
    let desired = JSVector.subGetNew(target,this.loc);
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.multiply(cohesion);
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
      steer.multiply(separate);
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
      sum.multiply(alignment);
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

  this.checkOrbit = function(){
    if(this.planet){
      return;
    }

    for(let i = 0; i < suns.length; i++){

      if(this.loc.distance(suns[i].loc) < this.orbRadius + suns[i].radius){
        this.planet = suns[i];
        this.rotator = JSVector.subGetNew(this.loc, this.planet.loc);
        this.rotator.setMagnitude(this.orbRadius + suns[i].radius);

      }
    }
  }

  this.orbit = function(p){

    var h = this.orbRadius + p.radius;
    this.rotator.rotate(.008);
    this.loc.x = p.loc.x + this.rotator.x;
    this.loc.y = p.loc.y + this.rotator.y;

  }

  this.eat = function(planet){

    if(this.loc.distance(planet.loc) < this.orbRadius + planet.radius){

      var hunger = JSVector.subGetNew(planet.loc, this.loc);
      hunger.normalize();
      hunger.multiply(.6);
      this.vel.add(hunger);
      this.vel.limit(2);

    }
  }

  this.repel = function(suns){

      var d = this.loc.distance(suns.loc);

      if(d < 300){
        var repulsionForce = JSVector.subGetNew(suns.loc, this.loc);
        repulsionForce.normalize();
        repulsionForce.multiply(0.5);
        this.vel.add(repulsionForce);
      }


  }


}