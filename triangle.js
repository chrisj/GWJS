(function (window) {

	function Triangle(x, y) {
		this.initialize(x, y);
	}

	var p = Triangle.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.triangleShape;
	p.active;

	p.initialize = function(x, y) {
		this.Container_initialize();

		this.x = x;
		this.y = y;
		this.active = true;

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
		if (this.active) {

			// move the triangle toward the jet
			var target = window.jet;

			this.x += 5;
			this.y += 5;

			this.checkCollision();
		}
	}

	p.checkCollision = function(event) {
		// check jet
		var target = window.jet;

		var distance = distanceBetweenPoints(this.x, this.y, target.x, target.y);

		if (distance < 30) {
			window.destroyJet();
		}

		for (var i = 0; i < window.bullets.length; i++) {
			var enemy = window.bullets[i];

			var distance = distanceBetweenPoints(this.x, this.y, enemy.x, enemy.y);

			if (distance < 17) {
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

	window.Triangle = Triangle;
}(window))