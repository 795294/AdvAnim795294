function Particle(x, y, vx, vy, ax, ay, rad, clr){
  this.loc  = new JSVector(x,y);
  this.vel  = new JSVector(vx,vy);
  this.acc  = new JSVector(ax,ay);
  this.radius = rad;
  this.color = clr;

  this.lifespan = Math.random()*1;

this.render = function(context){

  context.strokeStyle = 'rgba(255,255,255,'+this.lifespan+')';
  context.fillStyle = 'rgba(255,255,255,'+this.lifespan+')';
  context.beginPath();

  context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  context.stroke();
  context.fill();

}

this.update = function(){

  this.loc.add(this.vel);
  this.vel.add(this.acc);

  this.lifespan -= 0.01;

}

this.run = function(){
  this.render();
  this.update();

}

this.isDead = function() {
  if(this.lifespan < 0){
    return true;

  } else {
    return false;
  }
}

}
