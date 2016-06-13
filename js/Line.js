function Line(index) {
  this.index = index;
  this.distance = 0;
  this.end = math.zeros(2);
  this.start = math.zeros(2);
  this.surface = math.zeros(2);
}
Line.prototype = {
  setEnd: function(end) {
    this.end = end;
  },
  setDist: function(dist) {
    this.distance = dist;
  },
  getIndex: function() {
    return this.index;
  },
  setStart: function(point) {
    this.start = point;
  },
  getDist: function() {
    return this.distance;
  },
  draw: function() {

    // ctx.lineWidth = 2;
    // ctx.beginPath();
    // ctx.moveTo(this.start[0], this.start[1]);
    // ctx.strokeStyle = "#111"
    // ctx.lineTo(this.surface[0], this.surface[1]);
    // ctx.closePath();
    // ctx.stroke();
    var surface_onCanvas = mapToCanvas(this.surface[0], this.surface[1]);
    var cross_onCanvas = mapToCanvas(this.end[0], this.end[1]);
    ctx.beginPath();
    ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
    ctx.arc(surface_onCanvas[0], surface_onCanvas[1], 2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cross_onCanvas[0], cross_onCanvas[1]);
    ctx.strokeStyle = "#E34"
    ctx.lineTo(surface_onCanvas[0], surface_onCanvas[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
    ctx.arc(cross_onCanvas[0], cross_onCanvas[1], 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    console.log("===============================================");
  },
  setSurface: function() {
    var point_x = vehicle.xPosition + RADIUS / scale * math.cos(ang_phi - math.pi / 4 + ((math.pi / 4) * this.index));
    var point_y = vehicle.yPosition + RADIUS / scale * math.sin(ang_phi - math.pi / 4 + ((math.pi / 4) * this.index));
    this.surface = [point_x, point_y];
  },
  getSur: function() {
    return this.surface;
  }
}
