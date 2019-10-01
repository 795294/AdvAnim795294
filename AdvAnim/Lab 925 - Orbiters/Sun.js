function Sun(x, y, rad, hue, vx, vy){
  this.vel = new JSVector(vx, vy);
  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.hue = hue;
  this.aVel = Math.random()*100;

  this.render = function() {

      this.hue++;

      if(this.hue>360){
        hue = 0;
      }

        context.strokeStyle = 'hsl('+ this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.fillStyle = 'hsl('+ this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')'
        context.beginPath();

        context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
        context.stroke();
        context.fill();

  }

  this.update = function() {

      this.loc.add(this.vel);

  }

  this.run = function() {

    this.update();
    this.render();
    this.checkEdges();

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
