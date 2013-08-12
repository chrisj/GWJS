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
	}

	p.makeShape = function () {}

	p.tick = function(event) {
		if (this.active) {

			// move the triangle toward the jet
			var target = window.jet;

			var deltax = target.wx - this.wx;
			var deltay = target.wy - this.wy;

			var angle = Math.atan2(deltay, deltax);

			this.wx += this.velocity * Math.cos(angle);
			this.wy += this.velocity * Math.sin(angle);

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

	// p.inBounds = function() {
 //        return this.inBoundsX() && this.inBoundsY();
 //    }

 //    p.inBoundsX = function() {
 //        return this.x - this.radius > 0 && this.x + this.radius <= window.worldWidth;
 //    }

	// p.inBoundsY = function() {
 //        return this.y - this.radius > 0 && this.y + this.radius <= window.worldHeight;
 //    }

	window.Enemy = Enemy;
}(window))
