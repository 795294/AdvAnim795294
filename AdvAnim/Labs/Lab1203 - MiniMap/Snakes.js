function Snake(x, y, vx, vy, radius){
  this.loc = new JSVector(x, y);
  this.initialVelocity = new JSVector(vx, vy);
  this.newVector = new JSVector();

  this.mag = this.initialVelocity.getMagnitude();
  this.radius = radius;
  this.segments = [];
  this.velocities = [];

  this.lineWidth = 30;

  this.transparency = 1;

  this.render = function() {

    worldContext.strokeStyle = 'rgba(255,255,255,'+this.transparency+')';
    worldContext.fillStyle = 'rgba(255,255,255,'+this.transparency+')';
    worldContext.beginPath();
    worldContext.arc(this.segments[0].x, this.segments[0].y, this.radius, 0, Math.PI*2, false);
    worldContext.fill();
    worldContext.stroke();

    for(let i = 1; i < this.segments.length; i++){

      worldContext.strokeStyle = 'rgba(255,255,255,'+(this.transparency-i*0.1)+')';
      worldContext.fillStyle = 'rgba(255,255,255,'+(this.transparency-i*0.1)+')';

      worldContext.lineWidth = this.lineWidth-(i*2.75);

      worldContext.lineCap = 'round';

      worldContext.beginPath();
      worldContext.moveTo(this.segments[i-1].x, this.segments[i-1].y);
      worldContext.lineTo(this.segments[i].x, this.segments[i].y);
      worldContext.fill();
      worldContext.stroke();

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

    this.segments[0].add(this.velocities[0]);

    for(let i = 1; i < this.segments.length; i++){
      if(this.segments[i].distance(this.segments[i-1]) > 2*this.radius){

        this.newVector = JSVector.subGetNew(this.segments[i], this.segments[i-1]);

        this.newVector.setMagnitude(this.mag);

        this.segments[i] = this.segments[i].sub(this.newVector);

      }
    }
  }


  this.checkEdges = function(){
    if(this.segments[0].x + this.radius > world.width/2 || this.segments[0].x - this.radius < -world.width/2){
      this.velocities[0].x = -this.velocities[0].x;
    }

    if(this.segments[0].y + this.radius > world.height/2 || this.segments[0].y - this.radius < -world.height/2){
      this.velocities[0].y = -this.velocities[0].y;
    }
  }



  }
