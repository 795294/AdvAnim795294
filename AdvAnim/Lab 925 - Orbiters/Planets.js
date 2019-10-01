function Planet(x, y, rad, or, hue, vx, vy){
  this.vel = new JSVector(vx, vy);

  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.orbitRadius = or;
  this.hue = hue;
  this.angle = Math.random()*100;
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

  this.update = function() {

    this.loc.add(this.vel);

    this.angle += this.aVel;

  }

  this.run = function() {

    this.update();
    this.render();
    this.changeOrbitRadius();

  }

  this.orbit = function(v2){
    var hypotenuse = this.orbitRadius + this.radius;

    this.loc.x = v2.loc.x + hypotenuse*Math.cos(this.angle);
    this.loc.y = v2.loc.y + hypotenuse*Math.sin(this.angle);

  }

  this.connect = function(v2){

      context.lineWidth = 2;
      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
      context.moveTo(this.loc.x, this.loc.y);
      context.lineTo(v2.loc.x, v2.loc.y);
      context.stroke();

  }

  this.changeOrbitRadius = function(){
    if(this.orbitRadius > 300){
      this.orbitRadiusChange *= -1;
    }else if(this.orbitRadius < 100){
      this.orbitRadiusChange *= -1;
    }
    this.orbitRadius += this.orbitRadiusChange;
    }
}
