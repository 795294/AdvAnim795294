function Ball(x, y, rad, vx, vy, type){
  this.loc = new JSVector(x,y);
  this.vel = new JSVector(vx,vy);
  this.radius = rad;
  this.mass = this.radius*10;
  this.type = type;

  this.render = function(context) {

    if(this.type === 'blue'){

      context.beginPath();
      context.strokeStyle = 'blue';
      context.fillStyle = 'blue';
      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

    }

    if(this.type === 'red'){

      context.beginPath();
      context.strokeStyle = 'red';
      context.fillStyle = 'red';
      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

    }


    }


  this.update = function() {

    this.loc.add(this.vel);
    this.vel.limit(4);

  }

  this.run = function() {

    this.update();
    this.render();
    this.checkEdges();

  }

  this.checkEdges = function(){

      if(this.loc.x + this.radius > world.width/2 || this.loc.x - this.radius < -world.width/2){
        this.vel.x = -this.vel.x;
      }

      if(this.loc.y + this.radius > world.height/2 || this.loc.y - this.radius < -world.height/2){
        this.vel.y = -this.vel.y;
      }
  }

  this.connect = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<100){

      collideLocx = this.loc.x;
      collideLocy = this.loc.y;

      context.lineWidth = 2;
      context.strokeStyle = 'rgb(0,100,100)';
      context.moveTo(this.loc.x, this.loc.y);
      context.lineTo(v2.loc.x, v2.loc.y);
      context.stroke();

      var connectEvent = new Event("connect");
      window.dispatchEvent(connectEvent);

    }


  }

}
