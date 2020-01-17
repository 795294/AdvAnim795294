function Enemy(x, y, rad, hue){

  this.loc = new JSVector(x,y);
  this.radius = rad;
  this.hue = hue;

  this.render = function() {

      this.hue ++;

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

  this.run = function() {
    this.render();
  }

  this.update = function(v2){
    var d = this.loc.distance(v2.loc);

    if(d<this.radius){
      this.loc.x = Math.random()*window.innerWidth;
      this.loc.y = Math.random()*window.innerHeight;
    }
  }

}
