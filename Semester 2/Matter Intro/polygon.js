function Polygon(x, y, sides, radius, color, static, density){

    this.isStatic = static;
    this.density = density;

    this.x = x;
    this.y = y;

    this.color = color;

    this.sides = sides;
    this.radius = radius;
    this.poly = Bodies.polygon(this.x, this.y, this.sides, this.radius, { isStatic: this.isStatic, density: this.density });

    this.render = function(){

      context.lineWidth = 5;
      context.strokeStyle = this.color;
      context.fillStyle = this.color;

      this.poly.vertices;

      context.moveTo(this.poly.vertices[0].x, this.poly.vertices[0].y);

         for (var j = 1; j < this.poly.vertices.length; j++) {
             context.lineTo(this.poly.vertices[j].x, this.poly.vertices[j].y);
         }

      context.lineTo(this.poly.vertices[0].x, this.poly.vertices[0].y);

      context.stroke();

    }

}