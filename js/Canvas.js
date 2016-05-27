var canvas = $("#canvas");
var ctx = canvas.get(0).getContext("2d");
var set = false;

var heightRaio = 6;
var widthRaio = 24;

canvas.click(function(e) {
  var x = e.clientX - $(this).offset().left;
  var y = e.clientY - $(this).offset().top;
  set = true;
});
canvas.mousemove(function(e) {
  if(!set) {
    clear();
    var x = e.clientX - $(this).offset().left;
    var y = e.clientY - $(this).offset().top;
    drawVehicle(x, y);
  }
});

function drawVehicle(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
  ctx.arc(x, y, 10, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.fillStyle = 'rgba(255,255,255, 1)';
  ctx.fillRect(0,0,canvas.width(), canvas.height());
}
