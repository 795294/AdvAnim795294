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

  this.update = function(v2) {

      this.loc.add(this.vel);

      this.vel.limit(2);

      if(this.isColliding(v2)){
        this.loc.x = Math.random()*((window.innerWidth-2*this.radius)+this.radius);
        this.loc.y = Math.random()*((window.innerHeight-2*this.radius)+this.radius);

        this.vel.x = (Math.random()*1)-0.5;
        this.vel.y = (Math.random()*1)-0.5;
      }

  }

  this.run = function() {

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

  this.isColliding = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<this.radius){

      return true;
    } else {
      return false;
    }
  }

}
