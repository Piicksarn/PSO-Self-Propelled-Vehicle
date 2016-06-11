// Setting the initial angle
var $range = $("#range"),
$result = $("#angle");
var track = function (data) {
  $result.html("Angle: " + data.from);
};
$range.ionRangeSlider({
  hide_min_max: true,
  keyboard: true,
  min: -90,
  max: 270,
  from: 0,
  grid: true,
  onStart: track,
  onChange: track,
  onFinish: track,
  onUpdate: track
});

$(function () {
 var $Rrange = $("#Rrange");
 var Rtrack = function (data) {
 };
$("#Rrange").ionRangeSlider({
    hide_min_max: true,
    keyboard: true,
    min: 1,
    max: 50,
    from: 5,
    grid: true,
    onStart: Rtrack,
    onChange: Rtrack,
    onFinish: Rtrack,
    onUpdate: Rtrack
});

});

function newPosition() {
  //groupBest
  // datalgn = 4 and 6
  //var angle =
  console.log("data best: " + groupBest);

}
function inBound(x , y) {
  if( x - 3 * scale < mapToCanvas(-6, 0)[0])
    return false;
  if( x + 3 * scale > mapToCanvas(30, 0)[0])
    return false;
  if( x - 3 * scale > mapToCanvas(-6, 0)[0] && y - 3 * scale < mapToCanvas(0, 22)[1] && x - 3 * scale < mapToCanvas(18, 0)[0])
    return false;
  if( x + 3 * scale > mapToCanvas(6, 0)[0] && y + 3 * scale > mapToCanvas(0, 10)[1] && x + 3 * scale < mapToCanvas(30, 0)[0])
      return false;
  return true;
}

function calDist(center, surface, line) {
  var interList = new Array();
  for (var i = 0; i < wallList.length; i++) {
    var intPoint = intersect(center, surface, wallList[i]);
      if(intPoint != null){
        interList.push(intPoint);
        console.log("cross points: " + intPoint);
      }
  }
  var min = 300;
  for (var i = 0; i < interList.length; i++) {
    if(math.distance(interList[i], center) < min) {
      min = math.distance(interList[i],[vehicle.xPosition, vehicle.yPosition]);
      line.setEnd(interList[i]);
      line.setDist(min);
    }
  }
}
function intersect(start, end, wall) {
    var crossPnt = math.round(math.intersect(start, end, wall.getSP(), wall.getEP()));
    var inRage = false;
    if(onLine(crossPnt))
       if(math.dot([(end[0] - start[0]), (end[1] - start[1])], [(crossPnt[0] - start[0]), (crossPnt[1] - start[1])]) > 0) {
           wall.getStyle() == 'y' ? inRage = checkInBound(crossPnt[0], wall) : inRage = checkInBound(crossPnt[1], wall);
           if(inRage)
             return math.round(math.intersect(start, end, wall.getSP(), wall.getEP()));
       }
    return null;
}

function onLine(point) {
  var value = point[0];
  var value2 = point[1];
  for( var i in wallList) {
      if(value == wallList[i].getMax() || value == wallList[i].getMin() ||
         value == wallList[i].getX() || value == wallList[i].getX())
        return true;
      if(value2 == wallList[i].getMax() || value2 == wallList[i].getMin() ||
           value2 == wallList[i].getX() || value2 == wallList[i].getX())
        return true;
  }
  return false;
}
function checkInBound(x, wall) {
  if(x >= wall.getMin() && x <= wall.getMax())
      return true;
  return false;
}
