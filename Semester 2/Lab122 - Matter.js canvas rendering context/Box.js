function Box(x, y, width, height){

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.render = function(body){

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle - Math.PI/2);

    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);

    context.restore();
  }

}
