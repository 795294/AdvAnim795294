function System(rad, clr, x, y) {
  this.system = [];
  this.radius = rad;
  this.color = clr;
  this.x = x;
  this.y = y;

  this.system.push(new ParticleSystem(this.radius, this.color));
  this.system.push(new ParticleSystem(this.radius, this.color));
  this.system.push(new ParticleSystem(this.radius, this.color));

  this.update = function(){
    for(var i = 0; i < this.system.length; i++) {
      console.log("run particle system")
      this.system[i].run();
    }
  }
}
