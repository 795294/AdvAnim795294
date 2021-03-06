function Ship(x, y, vx, vy, ax, ay, hue){

  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay)
  this.hue = hue;

  this.render = function(context) {

      this.hue ++;

      if(this.hue>360){
        hue = 0;
      }

      context.lineWidth = 2;
      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
      context.stroke();

      context.save();

      context.translate(this.loc.x, this.loc.y);
      this.angle = this.vel.getDirection();
      context.rotate(this.angle - Math.PI/2);
      context.beginPath();
      context.moveTo(-9, -12);
      context.lineTo(0,15);
      context.moveTo(0,15);
      context.lineTo(9,-12);
      context.moveTo(9,-12);
      context.lineTo(-9,-12);

      context.restore();



  }

  this.update = function() {

      this.loc.add(this.vel);

      this.vel.limit(4);
  }

  this.run = function() {

    this.render();
    this.update();

  }

  this.attract = function(v2){

      var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
      attractionForce.normalize();
      attractionForce.multiply(0.5);
      this.vel.add(attractionForce);

  }
}
