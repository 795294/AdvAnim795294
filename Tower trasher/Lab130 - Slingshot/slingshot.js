function Slingshot(body){
    this.targetBody = body;

    this.addAnchor = function(){
        this.anchor = { x: body.x, y: body.y };
        this.elastic = Constraint.create({
            pointA: this.anchor,
            bodyB: this.body,
            stiffness: 0.05,
            length: 20

        });
    }
    
    
    World.add(engine.world, [this.rock, this.elastic]);

    this.onRelease = function() {
        this.rock = Bodies.polygon(this.x, this.y, 7, 20, this.rockOptions);
        rocks.push(this.rock);
        World.add(engine.world, this.rock);
        this.elastic.bodyB = this.rock;
    }
}

