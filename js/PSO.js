/**
 * @var {agentList} is an container for agents.
 * @var {phi_1}
 * @var {phi_2}
 */
var phi_1, phi_2;
var agentList = new Array();

function trainPSO() {
  setAgent();



}

function setAgent() {
  for( var i in dataList) {
    var size = dataList.length;
    var agentData = new Array();
    for (var j = 0; j < dataList[i].length - 1)
      agentData.push(dataList[i][j]);
    var agent = new Agent(agentData);
    agent.CreateAgent();
    agentList.push(agent);
  }
}
