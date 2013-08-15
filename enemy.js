(function (window) {

	function Enemy(wx, wy, radius, velocity) {
		this.initialize(wx, wy, radius, velocity);
	}

	var p = Enemy.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;

	p.shape;
	p.active;
	p.radius;
	p.velocity;
	p.rotatesToTarget;

	p.initialize = function(wx, wy, radius, velocity) {
		this.WorldObject_initialize(wx, wy);

		this.radius = radius;this.x
		this.velocity = velocity;
		this.active = true;
		this.rotatesToTarget = true;

		this.shape = new createjs.Shape();
		this.addChild(this.shape);
		this.makeShape();
		this.shape.cache(-this.radius - 2, -this.radius - 2, 2*this.radius + 4, 2*this.radius + 4);
	}

	p.makeShape = function () {}

	p.tick = function(event) {
		if (this.active) {

			// move the triangle toward the jet
			var target = window.jet;

			var deltax = target.wx - this.wx;
			var deltay = target.wy - this.wy;

			var angle = Math.atan2(deltay, deltax);

			this.wx += (event.delta / 1000) * this.velocity * Math.cos(angle);
			this.wy += (event.delta / 1000) * this.velocity * Math.sin(angle);

			if (this.rotatesToTarget) {
				this.rotation = toDegrees(angle);
			}

			this.checkCollision();

			this.updateCanvasPosition();
		}
	}

	p.checkCollision = function(event) {
		// check jet
		var target = window.jet;

		var distance = distanceBetweenPoints(this.wx, this.wy, target.wx, target.wy);

		if (distance < this.radius + target.radius) {
			target.destroy();
		}

		// check bullets
		for (var i = 0; i < window.bullets.length; i++) {
			var enemy = window.bullets[i];

			var distance = distanceBetweenPoints(this.wx, this.wy, enemy.wx, enemy.wy);

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

	window.Enemy = Enemy;
}(window))
