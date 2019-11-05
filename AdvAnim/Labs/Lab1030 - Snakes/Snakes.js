function Snake(length, color, x, y, vx, vy, radius){
  this.length = length;
  this.color = color;
  this.loc = new JSVector(x, y);
  this.initialVelocity = new JSVector(vx, vy);
  this.newVector = new JSVector();

  this.mag = this.initialVelocity.getMagnitude();
  this.radius = radius;
  this.segments = [];
  this.velocities = [];

  this.render = function() {

    for(let i = 0; i < this.segments.length; i++){
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.segments[i].x, this.segments[i].y, this.radius, 0, Math.PI*2, false);
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
    if(this.segments[0].x + this.radius > canvas.width || this.segments[0].x - this.radius < 0){
      this.velocities[0].x = -this.velocities[0].x;
    }

    if(this.segments[0].y + this.radius > canvas.height || this.segments[0].y - this.radius < 0){
      this.velocities[0].y = -this.velocities[0].y;
    }
  }



  }
