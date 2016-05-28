var Agent = function(datas){
  this.position = new Array();
  this.dataSet = datas;
  this.velocity = new Array();
  this.weight = new Array();
  this.mean = new Array();
  this.sigma = new Array();
  this.theta = 0;
};
Agent.prototype = {
  /**
   * @name CreateAgent
   * @function A function for initialize the element of the system
   */
  CreateAgent: function() {
    var agent_Pos = new Array();
    var p = new Array();
    var neuro_j = 3; //neuro number. In this program, I decided to set it with 3.
    var mean = new Array(neuro_j); //set to be p*j matrix. Each element is in range 0 ~ 30.
    var sigma = new Array(neuro_j); //the size of sigma is the same with neuro_j. Each element is in range 0 ~ 10
    var theta = Math.random(); //is a random number in range 0 - 1.
    var weight = new Array(neuro_j); //-40 ~ 40

    for(var i = 0; i < sigma.length; i++) {
      sigma[i] = Math.floor((Math.random() * 10) + 1);
      weight[i] = Math.floor((Math.random() * 80) - 40);
      // console.log("sigma-[ "+sigma[i]+" ]\n");

    }
    for(var i = 0; i < mean.length; i++) {
      var temp = new Array(dataLgn - 1);
      for(var j = 0; j < temp.length; j++)
        temp[j] = Math.floor((Math.random() * 30));
      mean[i] = temp;
    }
    // console.log("sigma_size: "+sigma.length);

    agent_Pos.push(theta);
    //  console.log("theta: "+ theta + "\n");
    for(var i in weight) {
      agent_Pos.push(weight[i]);
      // console.log("weight-[ "+ weight[i] + " ]\n");
    }
    for(var i in mean)
      for(var j in mean[i]) {
        agent_Pos.push(mean[i][j]);
        // console.log("mean-[ "+ mean[i][j] + " ]\n");
      }
    for(var i in sigma) {
      agent_Pos.push(sigma[i]);
      // console.log("sigma-[ "+ sigma[i] + " ]\n");
    }
    this.position = agent_Pos;
    this.mean = mean;
    this.wight = weight;
    this.sigma = sigma;
    this.theta = theta;
  },
  getPos: function() {
    return this.position;
  },
  getVel: function() {
    return this.velocity;
  },
  updatePos: function() {
    for(var i in this.position)
      this.position[i] = this.position[i] + this.velocity[i];
    updateBest();
  },
  updateBest: function() {
    if(E(this.position) < E(this.best))
      this.best = this.position;
  },
  updateVel: function(agentG) {
    for(var i in this.velocity)
      this.velocity[i] = this.velocity[i]
                         + phi_1 * (this.best[i] - this.position[i])
                         + phi_2 * (agentG[i] - this.position[i]);
  }
}
