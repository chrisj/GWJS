(function (window) {
	"use strict";

	function Triangle(x, y) {
		this.initialize(x, y);
	}

	var p = Triangle.prototype = new Enemy();

	p.Enemy_initialize = p.initialize;

	p.initialize = function(x, y) {
		this.Enemy_initialize(x, y, 15, 200, "#0060ff");
	}

	p.makeShape = function () {
		var g = this.graphics;
		g.clear();
		g.setStrokeStyle(2, "round").beginStroke(this.color).drawPolyStar(0, 0, this.radius, 3, 0, 0);
	}

	window.Triangle = Triangle;
}(window))
