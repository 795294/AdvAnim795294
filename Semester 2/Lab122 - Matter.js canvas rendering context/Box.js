function Box(x, y, width, height, static){
  this.isStatic = static;

  this.width = width;
  this.height = height;
  this.box = Bodies.rectangle(x, y, width, height, { isStatic: static });

  this.render = function(){

    if(!this.isStatic){
      //position is a property of all matter.js bodies

      context.save();
      context.translate(this.box.position.x, this.box.position.y);
      var direction = this.box.angle;
      context.rotate(direction);
      context.rect(-.5*this.width, -.5*this.height, this.width, this.height);
      context.restore();

    }
  }

  this.render2 = function(){
    for (var i = 0; i < bodies.length; i += 1) {
       var vertices = bodies[i].vertices;

       context.moveTo(vertices[0].x, vertices[0].y);

       for (var j = 1; j < vertices.length; j += 1) {
           context.lineTo(vertices[j].x, vertices[j].y);
       }

       context.lineTo(vertices[0].x, vertices[0].y);
   }
  }

}
