var Agent = function(){
  // Variable for PSO training
  this.position = new Array();
  this.velocity = new Array();
  this.best = new Array();
  this.best_value = Number.MAX_VALUE;

  // Variable for calculate the Error
  this.Error = 0;
  this.weight = new Array();
  this.mean = new Array();
  this.sigma = new Array();
  this.theta = 0;
};
var neuroNum = 3; //neuro number. In this program, I decided to set it with 3.
Agent.prototype = {
  /**
   * @name initialize
   * @function A function for initialize the element of the system
   */
  initialize: function() {
    var agent_Pos = new Array();
    var mean = new Array(neuroNum); //set to be p*j matrix. Each element is in range 0 ~ 30.
    var sigma = new Array(neuroNum); //the size of sigma is the same with neuroNum. Each element is in range 0 ~ 10
    var theta = Math.random(); //is a random number in range 0 - 1.
    var weight = new Array(neuroNum); //-40 ~ 40

    for(var i = 0; i < sigma.length; i++) {
      sigma[i] = Math.floor((Math.random() * 10) + 1);
      weight[i] = Math.floor((Math.random() * 80) - 40);
      var temp = new Array(dataLgn - 1);
      for(var j = 0; j < temp.length; j++)
        temp[j] = Math.floor((Math.random() * 30));
      mean[i] = temp;
    }

    agent_Pos.push(theta);
    for(var i in weight) {
      agent_Pos.push(weight[i]);
    }
    for(var i in mean) {
      for(var j in mean[i]) {
        agent_Pos.push(mean[i][j]);
      }
    }
    for(var i in sigma) {
      agent_Pos.push(sigma[i]);
    }
    this.position = agent_Pos;
    this.weight = weight;
    this.mean = mean;
    this.sigma = sigma;
    this.theta = theta;
    this.velocity.length = agent_Pos.length;
    this.velocity.fill(0);
    this.best = this.position;
    // console.log("[demension] position: " + this.position.length +
    //                           " sigma: " + this.sigma.length +
    //                           " mean: " + this.mean.length +
    //                           " weight: " + this.weight.length);
  },
  getError: function() {
    return this.Error;
  },
  getVel: function() {
  //  console.log(this.mean[0] + " velocity:"+ this.velocity);

  },
  getPos: function() {
    return this.position;
  },
  updatePos: function() {
    for(var i in this.position)
      this.position[i] = this.position[i] + this.velocity[i];
    this.updateBest();
  },
  updateBest: function() {
    if(this.Error < this.best_value) {
      this.best = this.position;
      this.best_value = this.Error;
    }
    //console.log("best: " + this.best_value);
    //console.log("bestPos: " + this.best);

  },
  updateVel: function(agentG) {

    var alpha = Math.random();
    for(var i in this.velocity) {
      this.velocity[i] = alpha * this.velocity[i]
                         + $('#phi1').val() * (this.best[i] - this.position[i])
                         + $('#phi2').val() * (agentG[i] - this.position[i]);
      if(this.velocity[i] > vMax)
          this.velocity[i] = vMax;
      if(this.velocity[i] < -vMax)
          this.velocity[i] = -vMax;
    }
    //console.log("vel: " + this.velocity);

    this.updatePos();
    // console.log(
    //   "vel " + this.velocity +
    //             " phi_1: " +  $('#phi1').val() +
    //             " phi_2: " + phi_2 +
    //             " bestInHistory: " + this.best +
    //             " gtoupBest: " + agentG);
  },
  calFunction: function() {
  //   var mean = new Array(neuroNum);
  //   var theta = this.position[0];
  //   var weight = this.position.slice(1,neuroNum + 1);
  //   var meanBegin = 1 + neuroNum;
  //   var meanEnd = meanBegin + dataLgn - 1;
  //   for(var i = 0; i < neuroNum; i++) {
  //     mean[i] = this.position.slice(meanBegin, meanEnd);
  //     meanBegin = meanEnd;
  //     meanEnd = meanBegin + dataLgn - 1;
  //   }
  //   //console.log("b: " + meanBegin);
  //   var sigma = this.position.slice(meanBegin, this.position.length);
  // // //  for(var i in weight) {
  // //      console.log("w: " + weight);
  // //      //console.log("m:" + mean);
  // //      console.log("s:"+ sigma);
  // //      console.log("position" + this.position);
  // // //  }
  // // for(var i = 0; i < neuroNum; i++) {
  // //   console.log("mean: " + mean[i]);
  // // }
    var para = sliceData(this.position);
    this.Error = rbf(para[0], para[1], para[2], para[3]);
  }

}
