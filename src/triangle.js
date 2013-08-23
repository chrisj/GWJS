(function (window) {
	"use strict";

	var Triangle = Enemy.makeSubclass();
	var p = Triangle.prototype;

	p.initialize = function(x, y) {
		Enemy.prototype.initialize.call(this, x, y, 15, 200, "#0060ff");
	}

	p.makeShape = function () {
		var g = this.graphics;
		g.setStrokeStyle(2, "round").beginStroke(this.color).drawPolyStar(0, 0, this.radius, 3, 0, 0);
	}

	window.Triangle = Triangle;
}(window))
