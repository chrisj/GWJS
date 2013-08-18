"use strict";

// Utilities

function distanceBetweenPoints(x1, y1, x2, y2) {
	var dx = x1 - x2;
	var dy = y1 - y2;

	return Math.sqrt(dx*dx + dy*dy);
}

function distanceBetweenPointsSquared(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;

  return dx*dx + dy*dy;
}

function distanceToOrigin(x, y) {
	return Math.sqrt(x*x+y*y);
}

Array.prototype.removeIf = function(condition) {
  for (var i = 0; i < this.length; i++) {
    if (condition(this[i])) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
