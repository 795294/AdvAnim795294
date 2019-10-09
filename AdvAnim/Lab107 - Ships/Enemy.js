function Enemy(x, y, rad, hue){

  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.hue = hue;

  this.render = function() {

      this.hue += 0.1;

      if(this.hue>360){
        hue = 0;
      }

      context.strokeStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';;
      context.fillStyle =  'hsl('+ -this.hue + ',' + 100 + '%' + ',' + 50 + '%' +')';;
      context.beginPath();
      context.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
      context.stroke();
      context.fill();

  }

  this.update = function() {
    if(this.isColliding()){
      this.loc.x = Math.random()*canvas.width;
      this.loc.y = Math.random()*canvas.height;
    }

  }

  this.run = function() {
    this.render();
  }

  this.attract = function(ships){
    var d = 
  }
}
