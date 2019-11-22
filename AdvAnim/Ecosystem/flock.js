function Flock(){
  this.boidsRed = [];
  this.boidsBlue = [];

  this.run = function(){
    for(let i = 0; i< this.boidsRed.length; i++){
      this.boidsRed[i].run(this.boidsRed);
    }

    for(let i = 0; i<this.boidsBlue.length; i++){
      this.boidsBlue[i].run(this.boidsBlue);
    }
  }

  this.addRedBoid = function(b){
    this.boidsRed.push(b);
  }

  this.addBlueBoid = function(b){
    this.boidsBlue.push(b);
  }

}
