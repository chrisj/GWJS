"use strict";

// Utilities

// http://stackoverflow.com/questions/1595611/how-to-properly-create-a-custom-object-in-javascript
Function.prototype.makeSubclass= function() {
    function Class() {
        if (!(this instanceof Class)) {
            throw('Constructor called without "new"');
        }

        if ('initialize' in this) {
            this.initialize.apply(this, arguments);
        }
    }
    Function.prototype.makeSubclass.nonconstructor.prototype= this.prototype;
    Class.prototype= new Function.prototype.makeSubclass.nonconstructor();
    return Class;
};
Function.prototype.makeSubclass.nonconstructor= function() {};

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
