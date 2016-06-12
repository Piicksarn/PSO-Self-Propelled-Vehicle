var ang_phi = math.pi / 2 + 0 * math.pi / 180;
var canvas = $("#canvas");
var ctx = canvas.get(0).getContext("2d");
var set = false;
var lineList = new Array();
var scale = 9;
var RADIUS = 3 * scale;
var vehicle = {
  xPosition: 0,
  yPosition: 0
}

canvas.click(function(e) {
  var x = e.clientX - $(this).offset().left;
  var y = e.clientY - $(this).offset().top;
  if(!set) {
    inBound(x, y) ? (
      set = true,
      vehicle.xPosition = mapToCal(x, y)[0],
      vehicle.yPosition = mapToCal(x, y)[1],
      setLine(mapToCal(x, y)),
      $("#go").show()
    ) : set = false;
  }
});

canvas.mousemove(function(e) {
  if(!set) {
    clear();
    drawMap();
    var x = e.clientX - $(this).offset().left;
    var y = e.clientY - $(this).offset().top;
    drawVehicle(x, y);
  }
});

function drawVehicle(x, y) {
  ctx.beginPath();
  inBound(x,y) ? ctx.fillStyle = "rgba(20, 20, 20, 0.7)" : ctx.fillStyle = "rgba(0, 200, 0, 0.7)";
  ctx.arc(x, y, RADIUS, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.fillStyle = 'rgba(255,255,255, 1)';
  ctx.fillRect(0,0,canvas.width(), canvas.height());
}

function mapToCanvas(x, y) {
  return [x * scale + 14 * scale, 450 - y * scale];
}

function mapToCal(x, y) {
  return ([(x / scale - 14),  -(y - 450) / scale]);
}

function setLine(point) {
  for(var i = 0; i < 3; i++) {
    var line = new Line(i);
    line.setStart(point);
    line.setSurface();
    calDist([vehicle.xPosition, vehicle.yPosition], line.getSur(), line);
    line.draw();
    lineList.push(line);
  }
}

function setWalls() {
  var wall1 = new Wall(-6, 0, 0, 22);
  wallList.push(wall1);
  var wall2 = new Wall(6, 0, 0, 10);
  wallList.push(wall2);
  var wall3 = new Wall(18, 0, 22, 50);
  wallList.push(wall3);
  var wall4 = new Wall(30, 0, 10, 50);
  wallList.push(wall4);
  var wall5 = new Wall(0, 10, 6, 30);
  wallList.push(wall5);
  var wall6 = new Wall(0, 22, -6, 18);
  wallList.push(wall6);
  var wall7 = new Wall(0, 0.001, -6, 6);
  wallList.push(wall7);
  var wall8 = new Wall(0, 50, 22, 30);
  wallList.push(wall8);
}

/**
 * @name Wall
 * The line equation of wall has 2 style:
 *   x = number OR y = number;
 */
var wallList = new Array();
var Wall = function(x, y, min, max) {
  this.x = x;
  this.y = y;
  this.min = min;
  this.max = max;
}

Wall.prototype = {
  getX: function() {
    return this.x;
  },
  getY: function() {
    return this.y;
  },
  getSP: function() {
    var point = math.zeros(2);
    if(this.x == 0)
      point = [this.min, this.y];
    else
      point = [this.x, this.min];
    return point;
  },
  getEP: function() {
    var point = math.zeros(2);
    if(this.x == 0)
      point = [this.max, this.y];
    else
      point = [this.x, this.max];
    return point;
  },
  getStyle: function() {
    if(this.x == 0)
      return 'y';
    return 'x';
  },
  getMin: function() {
    return this.min;
  },
  getMax: function() {
    return this.max;
  },
  getLine: function() {
    if(this.x == 0)
      return this.y;
    return this.x;
  }
}

var masaicColor = [
                    "rgba(152, 200, 70, 1)",
                    "rgba(87, 200, 70, 1)",
                    "rgba(70, 200, 118, 1)",
                    "rgba(241, 234, 80, 1)",
                    "rgba(156, 239, 56, 1)",
                   "rgba(202, 240, 255, 1)",
                   "rgba(255, 204, 202, 1)",
                   "rgba(202, 255, 218, 1)",
                   "rgba(156, 239, 56, 1)",
                   "rgba(202, 213, 255, 1)",
                   "rgba(253, 255, 202, 1)"
                   ]

function drawMap() {
  var colorIndex = 11;
  for(var j = 0; j < 450; j+= scale) {
    for(var i = 0; i < 450; i += scale) {
      ctx.beginPath();
      ctx.fillStyle = masaicColor[(i + j) % colorIndex];
      ctx.fillRect(j, i, scale, scale);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.beginPath();
  ctx.fillStyle = "rgba(255, 255, 250, 1)";
  ctx.fillRect(mapToCanvas(-6,22)[0], mapToCanvas(-6,22)[1], 12 * scale, 22 * scale);
  ctx.fillRect(mapToCanvas(6,22)[0], mapToCanvas(6,22)[1], 24 * scale, 12 * scale);
  ctx.fillRect(mapToCanvas(18, 50)[0], mapToCanvas(18, 50)[1], 12 * scale, 28 * scale);
  ctx.closePath();
  ctx.fill();
}


var angle_phi = 90;
var angle_theta = 0;
var start = false;

var Coordinate = function(theta) {
  this.theta = theta;
};

Coordinate.prototype ={
  getX: function() {
    var angle = math.add(math.cos(angle_phi + (this.theta * math.pi / 180)), math.sin(this.theta * math.pi / 180) * math.sin(angle_phi));
    return math.add(tmpX, angle);
  },
  getY: function() {
    var angle  = math.subtract(math.sin(angle_phi + (this.theta * math.pi / 180)), math.sin(this.theta * math.pi / 180) * math.cos(angle_phi));
    return math.add(tmpY, angle);
  },
  setTheta: function(angle) {
    this.theta = angle;
  },
  setNewPhi: function() {
    angle_phi = angle_phi - math.asin(2 * math.sin(this.theta * math.pi / 180) / RADIUS)
    return angle_phi;
  }
}
