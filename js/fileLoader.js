var setTwo = new Array(
  "train_0_D2.txt",
  "train_1_D2.txt",
  "train_2_D2.txt",
  "train_3_D2.txt",
  "train_4_D2.txt",
  "train_5_D2.txt",
  "train_6_D2.txt",
  "train_7_D2.txt",
  "train_8_D2.txt",
  "train_9_D2.txt",
  "train_10_D2.txt",
  "train_11_D2.txt",
  "train_12_D2.txt"
);
var setOne = new Array(
  "train_0_D1.txt",
  "train_1_D1.txt",
  "train_2_D1.txt",
  "train_3_D1.txt",
  "train_4_D1.txt",
  "train_5_D1.txt",
  "train_6_D1.txt",
  "train_7_D1.txt",
  "train_8_D1.txt",
  "train_9_D1.txt",
  "train_10_D1.txt",
  "train_11_D1.txt",
  "train_12_D1.txt"
);

$("#activations input").change(function() {
  $('#dataLd').empty();
  if($('input[name="myRadio"]:checked', '#activations').val()== 2) {
    for(var i in setTwo){
      var id_val = "set2" + i;
      jQuery('<option/>', {
        id: id_val,
        text: setTwo[i]
      }).appendTo('#dataLd');
    }
    fileName = fileName + "Set1/";
  }
  else if($('input[name="myRadio"]:checked', '#activations').val()== 1) {
    $('#dataLd').empty();
    for(var i in setOne){
      var id_val = "set1" + i;
      jQuery('<option/>', {
        id: id_val,
        text: setOne[i]
      }).appendTo('#dataLd');
    }
    fileName = fileName + "Set2/";
  }
});
$("#dataLd").change(function() {
  item = $( "#dataLd option:selected" ).text();
  readFile();
});


/**
 * readFile
 * A function for load the file content.
 *
 * @name readfile
 * @function
 */
var fileName = "Data/";
var item = "";
var nList = new Array();

function readFile() {
  var reader = new XMLHttpRequest();
  reader.open("GET", fileName + item, false);
  reader.send(null);
  var content = reader.responseText;
  var list = content.split('\n');
  while (nList.length) {
    nList.pop();
  }
  for (var i in list) {
    if(list[i].trim() != "")
       nList.push(list[i]);
  }
}
