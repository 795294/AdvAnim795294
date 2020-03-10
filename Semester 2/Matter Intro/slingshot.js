function Slingshot(x, y, sides, radius, color, static, density) {
    this.x = x;
    this.y = y;
    // add bodies

    this.isStatic = static;
    this.density = density;

    this.x = x;
    this.y = y;

    this.color = color;

    this.sides = sides;
    this.radius = radius;

    this.rock = new Polygon(this.x, this.y, this.sides, this.radius, { isStatic: this.isStatic, density: this.density });

    this.rockOptions = { density: 0.008 };
    this.rock = Bodies.polygon(this.x, this.y, 8, 20, this.rockOptions);
    rocks.push(this.rock);
    this.anchor = { x: this.x, y: this.y };
    this.elastic = Constraint.create({
        pointA: this.anchor,
        bodyB: this.rock,
        stiffness: 0.05,
        length: 20

    });

    World.add(engine.world, [this.rock, this.elastic]);

    this.onRelease = function () {
        this.rock = Bodies.polygon(this.x, this.y, 7, 20, this.rockOptions);
        rocks.push(this.rock);
        World.add(engine.world, this.rock);
        this.elastic.bodyB = this.rock;
    }
}