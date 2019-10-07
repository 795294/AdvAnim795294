function Ship(x, y, vx, vy, ax, ay, hue){

  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay)
  this.hue = hue;

  this.render = function() {

      this.hue += 0.1;

      if(this.hue>360){
        hue = 0;
      }

      context.lineWidth = 2;
      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
      context.stroke();

      context.save();

      context.translate(this.loc.x, this.loc.y);
      this.angle = this.vel.getDirection();
      context.rotate(this.angle);
      context.beginPath();
      context.moveTo(-10000, 0);
      context.lineTo(10000, 0);
      context.moveTo(0,-10000);
      context.lineTo(0,10000);

      context.restore();

  }

  this.update = function() {

      this.loc.add(this.vel);
      this.vel.add(this.acc);
  }

  this.run = function() {

    this.update();
    this.render();

  }
}
