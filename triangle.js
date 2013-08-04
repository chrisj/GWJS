(function (window) {

	function Triangle(x, y) {
		this.initialize(x, y);
	}

	var p = Triangle.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.triangleShape;

	p.initialize = function(x, y) {
		this.Container_initialize();

		this.x = x;
		this.y = y;


		this.triangleShape = new createjs.Shape();
		this.addChild(this.triangleShape);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.triangleShape.graphics;
		g.clear();
		g.beginFill("green").drawCircle(0, 0, 15);
	}

	p.tick = function(event) {
		// move the triangle toward the jet
		var target = window.jet;

		this.x += 5;
		this.y += 5;
	}

	p.inBounds = function() {
        return this.x > 0 && this.y > 0 && this.x <= window.canvasWidth && this.y <= window.canvasHeight;
    }

	window.Triangle = Triangle;
}(window))