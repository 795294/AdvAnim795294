function Particle(x, y, vx, vy, ax, ay){
  this.loc  = new JSVector(x,y);
  this.vel  = new JSVector(vx,vy);
  this.acc  = new JSVector(ax,ay);

  this.lifespan = 255;

this.render = function(){

  context.strokeStyle = 'rgb('+this.lifespan+','+this.lifespan+','+this.lifespan+')';
  context.fillStyle = 'rgb('+this.lifespan+','+this.lifespan+','+this.lifespan+')';
  context.beginPath();

  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  context.stroke();
  context.fill();

}

this.update = function(){

  this.loc.add(this.vel);
  this.vel.add(this.acc);

  this.lifespan -= 2;

}

this.run = function(){
  this.update();
  this.render();
}

this.isDead = function() {
  if(this.lifespan < 0){
    return true;
  } else {
    return false;
  }
}

}
