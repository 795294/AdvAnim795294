function Planet(x, y, rad, or, hue, vx, vy){
  this.vel = new JSVector(vx, vy);

  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.orbitRadius = or;
  this.hue = hue;
  this.angle = this.loc.angleBetween(this.loc, Sun.loc);
  this.aVel = Math.random()*0.01;
  this.orbitRadiusChange = 1;

  this.render = function() {

      this.hue++;

      if(this.hue>360){
        hue = 0;
      }

        context.strokeStyle = 'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.fillStyle = 'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.beginPath();

        context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
        context.stroke();
        context.fill();

  }

  this.update = function(v2) {

      this.angle += this.aVel;

      //this.changeOrbitRadius();

      this.orbit(v2);

  }

  this.run = function(v2) {

    this.update(v2);
    this.render();
    this.checkEdges()

  }

  this.orbit = function(v2){

    var d = this.loc.distance(v2.loc);

    if(d<200){

      var hypotenuse = this.orbitRadius + this.radius;

      this.loc.x = v2.loc.x + hypotenuse*Math.cos(this.angle);
      this.loc.y = v2.loc.y + hypotenuse*Math.sin(this.angle);

    }

  }

  this.connect = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<200){
      context.lineWidth = 2;
      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
      context.moveTo(this.loc.x, this.loc.y);
      context.lineTo(v2.loc.x, v2.loc.y);
      context.stroke();
    }

  }

  this.changeOrbitRadius = function(){
    if(this.orbitRadius > 200){
      this.orbitRadiusChange *= -1;
    }else if(this.orbitRadius < 100){
      this.orbitRadiusChange *= -1;
    }
    this.orbitRadius += this.orbitRadiusChange;
    }


  this.checkEdges = function() {
      if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
        this.vel.x = -this.vel.x;
      }

      if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
        this.vel.y = -this.vel.y;
      }
    }
}
