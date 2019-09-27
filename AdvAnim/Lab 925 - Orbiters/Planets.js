function Planet(x, y, rad, or, hue, vx, vy){
  this.vel = new JSVector(vx, vy);

  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.orbitRadius = or;
  this.hue = hue;
  this.angle = Math.random()*100;
  this.aVel = Math.random()*100;

  this.render = function() {

      this.hue++;

      if(this.hue>360){
        hue = 0;
      }

      if(this === sun){
        context.strokeStyle = 'hsl('+ this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.fillStyle = 'hsl('+ this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.beginPath();

        context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
        context.stroke();
        context.fill();
      } else {
        context.strokeStyle = 'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.fillStyle = 'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.beginPath();

        context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
        context.stroke();
        context.fill();
      }

  }

  this.update = function() {

    if(this === sun){
      this.loc.add(this.vel);
    }

    this.angle += this.aVel;

  }

  this.run = function() {

    this.update();
    this.render();
    this.checkEdges();

  }

  this.orbit = function(v2){
    var hypotenuse = this.orbitRadius + this.radius;

    this.loc.x = v2.loc.x + hypotenuse*Math.cos(this.angle);
    this.loc.y = v2.loc.y + hypotenuse*Math.sin(this.angle);

  }

  this.checkEdges = function() {
    if(this === sun){
      if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
        this.vel.x = -this.vel.x;
      }

      if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
        this.vel.y = -this.vel.y;
      }
    }
  }

  this.connect = function(v2){

      context.lineWidth = 2;
      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
      context.moveTo(this.loc.x, this.loc.y);
      context.lineTo(v2.loc.x, v2.loc.y);
      context.stroke();

  }
}
