function Snake(x, y, vx, vy, radius, hue){
  this.loc = new JSVector(x, y);
  this.initialVelocity = new JSVector(vx, vy);
  this.newVector = new JSVector();
  this.acc = new JSVector(0,0);
  this.hue = hue;

  this.mag = this.initialVelocity.getMagnitude();
  this.radius = radius;
  this.segments = [];
  this.velocities = [];

  this.lineWidth = 30;

  this.transparency = 1;

  this.render = function(context) {

    context.strokeStyle = 'hsla('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%'+ ',' + this.transparency+')';
    context.fillStyle = 'hsla('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%'+ ',' + this.transparency+')';
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
      context.moveTo(this.segments[i].x, this.segments[i].y);
      context.lineTo(this.segments[i-1].x, this.segments[i-1].y);
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

    this.segments[0].add(this.initialVelocity);

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

}
