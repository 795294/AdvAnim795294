

function Sun(x, y, rad, hue, vx, vy){
  this.vel = new JSVector(vx, vy);
  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.hue = hue;
  this.aVel = Math.random()*100;
  this.collison = false;



  this.render = function(context) {

    context.strokeStyle = 'hsl('+ this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
    context.fillStyle = 'hsl('+ this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';
    context.beginPath();

    context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
    context.stroke();
    context.fill();

      this.hue++;

      if(this.hue>360){
        hue = 0;
      }

  }

  this.update = function() {

      this.loc.add(this.vel);

      this.vel.limit(2);

  }

  this.run = function() {

    this.update();
    this.render();
    this.checkEdges();

  }

  this.checkEdges = function() {
      if(this.loc.x + this.radius > world.width/2 || this.loc.x - this.radius < -world.width/2){
        this.vel.x = -this.vel.x;
      }

      if(this.loc.y + this.radius > world.height/2 || this.loc.y - this.radius < -world.height/2){
        this.vel.y = -this.vel.y;
      }
  }

  this.checkCollision = function(ship){
    var d = this.loc.distance(ship.loc);

    if(d<this.radius){

      collideLocx = this.loc.x;
      collideLocy = this.loc.y;

      this.loc.x = ((Math.random()*world.width)-world.width/2)+this.radius;
      this.loc.y = ((Math.random()*world.height)-world.height/2)+this.radius;

      this.vel.x = (Math.random()*1)-0.5;
      this.vel.y = (Math.random()*1)-0.5;


      var collisionEvent = new Event("collide");
      window.dispatchEvent(collisionEvent);

  }

}

  this.repel = function(suns){

      var d = this.loc.distance(suns.loc);

      if(d < 400){
        var attractionForce = JSVector.addGetNew(suns.loc, this.loc);
        attractionForce.normalize();
        attractionForce.multiply(0.5);
        this.vel.add(attractionForce);
      }


  }

}
