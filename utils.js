// Utilities

function square(x) {
	return x * x;
}

function distanceBetweenPoints(x1, y1, x2, y2) {
	var deltax = x1 - x2;
	var deltay = y1 - y2;

	return Math.sqrt(square(deltax) + square(deltay));
}

// function distanceBetweenPoints(x1, y1, x2, y2) {
//   var deltax = x1 - x2;
//   var deltay = y1 - y2;

//   return deltax * deltax + deltay * deltay;
// }

function distanceToOrigin(x, y) {
	return distanceBetweenPoints(x, y, 0, 0);
}

Array.prototype.myfilter = function(condition) {
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
