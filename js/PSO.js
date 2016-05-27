/**
 * @var {agentList} is an container for agents.
 */
var agentList = new Array();
function setAgent() {
  for( var i in dataList) {
    var size = dataList.length;
    var agent = new Agent(dataList[i][size - 4],
                          dataList[i][size - 3],
                          dataList[i][size - 2]);
    agent.CreateAgent();
    agentList.push(agent);
  }
  // for(var j in agentList)
  //   console.log(j + " : " + agentList[j].getPos());
}
