(function (window) {

	function Enemy(x, y, radius, velocity) {
		this.initialize(x, y, radius, velocity);
	}

	var p = Enemy.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.shape;
	p.active;
	p.radius;
	p.velocity;

	p.initialize = function(x, y, radius, velocity) {
		this.Container_initialize();

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.velocity = velocity;
		this.active = true;

		this.shape = new createjs.Shape();
		this.addChild(this.shape);
		this.makeShape();
	}

	p.makeShape = function () {}

	p.tick = function(event) {
		if (this.active) {

			// move the triangle toward the jet
			var target = window.jet;

			var deltax = target.x - this.x;
			var deltay = target.y - this.y;

			var angle = Math.atan2(deltay, deltax);

			this.x += this.velocity * Math.cos(angle);
			this.y += this.velocity * Math.sin(angle);

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

		// check bullets
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
        return this.inBoundsX() && this.inBoundsY();
    }

    p.inBoundsX = function() {
        return this.x - this.radius > 0 && this.x + this.radius <= window.canvasWidth;
    }

	p.inBoundsY = function() {
        return this.y - this.radius > 0 && this.y + this.radius <= window.canvasHeight;
    }

	window.Enemy = Enemy;
}(window))