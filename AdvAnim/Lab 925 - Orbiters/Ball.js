function Planet(x, y, rad, or, clr){
  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.orbitRadius = or;
  this.color = clr;
  this.angle = Math.random()*100;
  this.aVel = 0.05;

  this.render = function() {
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
      context.beginPath();

      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

  }

  this.update = function() {

    this.angle += this.aVel;

  }

  this.run = function() {

    this.update();
    this.render();
    //this.checkEdges();

  }

  this.orbit = function(v2){
    var hy = this.orbitRadius + this.radius;

    if(this.loc.distance(v2.loc) <= 200){
      this.loc.x = v2.loc.x + hy*Math.cos(this.angle);
      this.loc.y = v2.loc.y + hy*Math.sin(this.angle);
    }

  }

  // this.checkEdges = function(){
  //
  //     if(this.loc.x + this.radius > canvas.width || this.loc.x - this.radius < 0){
  //       this.vel.x = -this.vel.x;
  //     }
  //
  //     if(this.loc.y + this.radius > canvas.height || this.loc.y - this.radius < 0){
  //       this.vel.y = -this.vel.y;
  //     }
  // }

}
