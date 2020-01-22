function Box(x, y, width, height){

  this.render = fucntion(){
    context.save();
    context.translate();
    context.rotate(this.angle - Math.PI/2);

    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height)

    context.restore();
  }
}
