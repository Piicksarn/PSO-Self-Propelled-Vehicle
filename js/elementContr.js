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
