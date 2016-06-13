/**
 * @var {agentList} is an container for agents.
 * @var {phi_1}
 * @var {phi_2}
 */
var agentList = new Array();
var groupBest = new Array();
var groupBest_value = Number.MAX_VALUE;
var vMax = 20;

function trainPSO() {
  for( var i = 0; i < agentList.length; i++) {
    agentList[i].calFunction();
  }
  searchGBest();
  updateVelocity();
 }

function setAgent() {
  for( var i = 0; i < $('#amount').val(); i++) {
    var agent = new Agent();
    agent.initialize();
    agentList.push(agent);
  }
}
var avgError = 10000;
function searchGBest() {
  for(var i in agentList)
    if(agentList[i].getError() < groupBest_value) {
      groupBest_value = agentList[i].getError();
      groupBest = agentList[i].getPos();
      best4Test = sliceData(groupBest);
      avgError = (groupBest_value * 2) / $('#amount').val();
      console.log("test-best: " + groupBest_value + " avgError : " + avgError);
    }
}

function updateVelocity() {
  for(var i in agentList) {
    agentList[i].updateVel(groupBest);
  }
}
