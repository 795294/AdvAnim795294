function Flock(){
  this.boidsRed = [];
  this.boidsBlue = [];
  var count  = 0;

  this.run = function(){
    for(let i = 0; i< this.boidsRed.length; i++){

      if(!this.boidsRed[i].isEaten){
        this.boidsRed[i].run(this.boidsRed);
      } else {
        this.boidsRed.splice(i,1);
      }
    }

    for(let i = 0; i<this.boidsBlue.length; i++){
      if(!this.boidsBlue[i].isEaten){
        this.boidsBlue[i].run(this.boidsBlue);
      } else {
        this.boidsBlue.splice(i,1);

        count++;

        if(count%100===0){
          var newOrbiterEvent = new Event("orbiter");
          window.dispatchEvent(newOrbiterEvent);
        }

      }
    }
  }

  this.addRedBoid = function(b){
    this.boidsRed.push(b);
  }

  this.addBlueBoid = function(b){
    this.boidsBlue.push(b);
  }

}
