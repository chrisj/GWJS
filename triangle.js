(function (window) {

	function Triangle(x, y) {
		this.initialize(x, y);
	}

	var p = Triangle.prototype = new Enemy();

	p.Enemy_initialize = p.initialize;

	p.initialize = function(x, y) {
		this.Enemy_initialize(x, y, 15, 3);
		this.shape.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
	}

	p.makeShape = function () {
		var g = this.shape.graphics;
		g.clear();
		g.setStrokeStyle(2, "round").beginStroke("blue").drawPolyStar(0, 0, this.radius, 3, 0, 0);
	}

	window.Triangle = Triangle;
}(window))
