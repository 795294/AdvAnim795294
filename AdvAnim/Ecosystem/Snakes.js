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

    context.strokeStyle = 'rgba(255,255,255,'+this.transparency+')';
    context.fillStyle = 'rgba(255,255,255,'+this.transparency+')';
    context.beginPath();
    context.arc(this.segments[0].x, this.segments[0].y, this.radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();

    for(let i = 1; i < this.segments.length; i++){

      context.strokeStyle = 'rgba(255,255,255,'+(this.transparency-i*0.1)+')';
      context.fillStyle = 'rgba(255,255,255,'+(this.transparency-i*0.1)+')';

      context.lineWidth = this.lineWidth-(i*2.75);

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

  this.attract = function(suns){

      var d = this.loc.distance(suns.loc);

      if(d < 300){
        var attractionForce = JSVector.subGetNew(suns.loc, this.loc);
        attractionForce.normalize();
        attractionForce.multiply(0.5);
        this.velocities[0].add(attractionForce);
      }


  }



  }
