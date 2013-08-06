(function (window) {

	function Triangle(x, y) {
		this.initialize(x, y);
	}

	var p = Triangle.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.triangleShape;
	p.active;
	p.radius;

	p.initialize = function(x, y) {
		this.Container_initialize();

		this.x = x;
		this.y = y;
		this.active = true;
		this.radius = 15;

		this.triangleShape = new createjs.Shape();
		this.addChild(this.triangleShape);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.triangleShape.graphics;
		g.clear();
		g.setStrokeStyle(2, "round").beginStroke("blue").drawPolyStar(0, 0, this.radius, 3, 0, 0);
	}

	p.tick = function(event) {
		if (this.active) {

			// move the triangle toward the jet
			var target = window.jet;

			var deltax = target.x - this.x;
			var deltay = target.y - this.y;

			var angle = Math.atan2(deltay, deltax);
			var speed = 6;

			this.x += speed * Math.cos(angle);
			this.y += speed * Math.sin(angle);

			this.rotation = toDegrees(angle);

			this.checkCollision();
		}
	}

	p.checkCollision = function(event) {
		// check jet
		var target = window.jet;

		var distance = distanceBetweenPoints(this.x, this.y, target.x, target.y);

		if (distance < this.radius + target.radius) {
			target.destroy();
		}

		for (var i = 0; i < window.bullets.length; i++) {
			var enemy = window.bullets[i];

			var distance = distanceBetweenPoints(this.x, this.y, enemy.x, enemy.y);

			if (distance < this.radius + enemy.radius  - 2) {
				this.destroy();
				break;
			}
		}
	}

	p.destroy = function() {
		this.active = false;
		window.stage.removeChild(this);
	}

	p.inBounds = function() {
        return this.x > 0 && this.y > 0 && this.x <= window.canvasWidth && this.y <= window.canvasHeight;
    }

    function square(x) {
    	return x * x;
    }
	window.Triangle = Triangle;
}(window))