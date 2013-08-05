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
		g.beginFill("green").drawPolyStar(0, 0, 15, 3, 0, 0);
	}

	p.tick = function(event) {
		// move the triangle toward the jet
		var target = window.jet;

		var deltax = target.x - this.x;
		var deltay = target.y - this.y;

		var angle = Math.atan2(deltay, deltax);
		var speed = 6;

		this.x += speed * Math.cos(angle);
		this.y += speed * Math.sin(angle);
	}

	p.inBounds = function() {
        return this.x > 0 && this.y > 0 && this.x <= window.canvasWidth && this.y <= window.canvasHeight;
    }

    function square(x) {
    	return x * x;
    }
	window.Triangle = Triangle;
}(window))