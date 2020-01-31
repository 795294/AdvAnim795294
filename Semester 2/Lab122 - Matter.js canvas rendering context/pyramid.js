function Pyramid(xPos, yPos, width, height, rows, cols){
  this.xPos = xPos;
  this.yPos = yPos;
  this.width = width;
  this.height = height;
  this.rows = rows;
  this.cols = cols;

  this.pyramid = Composites.pyramid(this.xPos, this.yPos, this.rows, this.cols, 0, 0, function(x, y) {
    var n = new Rectangle(x, y, this.width, this.height);
    return n.newRect;
  });


  this.run = function(){
    var pArray = this.pyramid.bodies;
    for(let i = 0; i < pArray.length; i++){
      context.save();
      context.translate(100, 100);
      var direction = pArray[i].angle;
      context.rotate(direction);
      context.rect(-.5*20, -.5*40, 20, 40);
      context.restore();
    }
  }

}
