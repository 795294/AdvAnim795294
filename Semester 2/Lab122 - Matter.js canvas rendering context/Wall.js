function Wall(x, y, width, height){

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  
  this.render = fucntion(){
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true })
  }
}
