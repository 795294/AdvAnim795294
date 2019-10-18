function ParticleSystem(rad, clr, x, y, vx, vy, ax, ax) {
  this.color = clr;
  this.radius = rad;
  this.pArray = [];
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);


  this.update = function() {
    this.vel.add(this.acceleration);
    this.loc.add(this.vel);

    this.pArray.push(new Particles(2, "green", 5, this.location.x, this.location.y, 150, false));//input parameters for particles

    for(var i = this.pArray.length-1; i > 0; i--) {
      if (!this.pArray[i].isDead()) {
        this.pArray[i].run();
      } else {
        this.pArray.splice(i, 1);
      }
    }
  }


  this.render = function() {
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.location.x,this.location.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
    ctx.stroke();
  }
  this.run = function() {
    this.update();
    this.render();
  }

}
