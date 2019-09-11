function Ball(x, y, rad, vx, vy, ax, ay){
  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx,vy);
  this.acc = new JSVector(ax,ay);
  this.radius = rad;

  this.render = function() {

    context.clearRect(0,0, canvas.width, canvas.height);

    context.strokeStyle = 'red';
    context.fillStyle = 'red';
    context.beginPath();

    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
    context.stroke();
    context.fill();

  }

  this.update = function() {

    window.requestAnimationFrame(update);

    this.loc.add(this.vel);
    this.acc.add(this.acc);

  }

  this.run = function() {
    this.update();
    this.render();
  }


}
