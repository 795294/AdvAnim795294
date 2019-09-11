
function Ball(){
  this.loc = new JSVector(100,100);
  this.vel = new JSVector(2,2);
  this.acc = new JSVector(0,0.5);
  this.radius = 30;

  this.animate = function() {

    requestAnimationFrame(animate);

    context.clearRect(0,0, canvas.width, canvas.height);

    context.strokeStyle = 'red';
    context.fillStyle = 'red';
    context.beginPath();

    context.arc(this.loc.x, this.loc.y, 30, 0, Math.PI*2, true);
    context.stroke();
    context.fill();

    this.loc.add(this.vel);
    this.acc.add(this.acc);

  }
}
