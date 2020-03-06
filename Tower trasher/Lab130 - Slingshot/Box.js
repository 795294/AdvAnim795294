function Box(x, y, width, height, color, static){

  this.x = x;
  this.y = y;
  this.isStatic = static;
  this.width = width;
  this.height = height;
  this.color = color;

  this.box = Bodies.rectangle(this.x, this.y, this.width, this.height, { isStatic: this.isStatic });

  this.render = function(){

      if(!this.isStatic){
        //position is a property of all matter.js bodies

        context.strokeStyle = this.color;
        context.fillStyle = this.color;

        context.save();
        context.translate(this.box.position.x, this.box.position.y);
        var direction = this.box.angle;
        context.rotate(direction);
        context.beginPath();
        context.rect(-.5*this.width, -.5*this.height, this.width, this.height);

        context.closePath();

        context.stroke();
        context.fill();

        context.restore();

      } else { //doesn't translate and rotate

        context.strokeStyle = this.color;
        context.fillStyle = this.color;

        context.beginPath();
        context.rect(-.5*this.box.position.y, -.5*this.box.position.y, this.width, this.height);

        context.closePath();

        context.stroke();
        context.fill();

      }


  }

}
