function ParticleSystem(x, y, vx, vy, ax, ay, rad, clr) {
  this.color = clr;
  this.radius = rad;
  this.pArray = [];
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.frameCount = 0;


  this.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);

    this.frameCount++;

    if(this.frameCount%20 === 0){
        this.loadParticles(1);
    }

    for(var i = this.pArray.length-1; i >= 0; i--) {
      if (!this.pArray[i].isDead()) {
        this.pArray[i].run();

      } else {
        this.pArray.splice(i, 1);
      }
    }
  }

  this.run = function() {
    this.update();

  }

  this.loadParticles = function(n){
    for(var i = 0; i<n; i++){
      this.pArray.push(new Particle(this.loc.x,this.loc.y,(Math.random()*3)-1.5,(Math.random()*3)-1.5,0,0.01,10,"green"));

  }

}

}
