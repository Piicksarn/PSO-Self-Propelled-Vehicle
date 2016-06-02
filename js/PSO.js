/**
 * @var {agentList} is an container for agents.
 * @var {phi_1}
 * @var {phi_2}
 */
var agentAmount = 10;
var agentList = new Array();
var groupBest = new Array();
var groupBest_value = Number.MAX_VALUE;
var vMax = 0.5;

function trainPSO() {
  //console.log("first: " + agentList[0].velocity);
  for( var i = 0; i < agentList.length; i++) {
    agentList[i].calFunction();
  }
  searchGBest();
  updateVelocity();

  console.log("==========================================")
  console.log("Minimal Error value: " + groupBest_value );
}

function setAgent() {
  for( var i = 0; i < agentAmount; i++) {
    var agent = new Agent();
    agent.initialize();
    //agent.calFunction();
    agentList.push(agent);
  }
}

function searchGBest() {
  for(var i in agentList)
    if(agentList[i].getError() < groupBest_value) {
      groupBest_value = agentList[i].getError();
      groupBest = agentList[i].getPos();
    }
}

function updateVelocity() {
  for(var i in agentList) {
    agentList[i].updateVel(groupBest);
    // console.log("-----------------------------");
  }

}
