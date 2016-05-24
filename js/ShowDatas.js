$( document ).ready(function(){
  $('#loadSet').hide();
});

/**
 * @name splitDatas
 * @function A function for spliting the string of nList, which stored the datas with space.
 *           Called by function: showSet.
 * @var {dataList} A list of arrays, each of arrays means a data of node.
 * @var {dataLgn} Numbers data of a node.
 */
var dataList = new Array();
var dataLgn;
function splitDatas() {
  for (var i in nList) {
    var datas = nList[i].split(" ");
    dataList.push(datas);
  }
  dataLgn = dataList[0].length;
}

/**
 * @name showSet
 * @function A function for the loading data on the frame
 */
function showSet() {
  $('#loadSet').show();
  splitDatas();
  table = $('#dataTable'),
  tr = $('<tr>');

  /* Set the titles for the loading datas */
  if(dataLgn == 6) {
    tr.append('<th>' + "X Pos." + '</th>' +
              '<th>' + "Y Pos." + '</th>' );
  }
  tr.append('<th>' + "Front" + '</th>' +
            '<th>' + "Right" + '</th>' +
            '<th>' + "Left" + '</th>' +
            '<th>' + "Angle" + '</th>' );
  table.append(tr);

  /* Set the loading datas */
  for (var index in dataList) {
    var tr = $('<tr>');
    for (var data in dataList[index])
      tr.append('<td>' + dataList[index][data] + '</td>');
    table.append(tr);
  }}
