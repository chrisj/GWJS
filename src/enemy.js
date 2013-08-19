(function (window) {
	"use strict";

	function Enemy(wx, wy, radius, velocity, color) {
		this.initialize(wx, wy, radius, velocity, color);
	}

	var p = Enemy.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;

	p.velocity;
	p.rotatesToTarget;
	p.alive;
	p.color

	p.initialize = function(wx, wy, radius, velocity, color) {
		this.WorldObject_initialize(wx, wy, radius);

		this.velocity = velocity;
		this.rotatesToTarget = true;
		this.alive = true;
		this.color = color;

		this.makeShape();
		this.cache(-this.radius - 2, -this.radius - 2, 2*this.radius + 4, 2*this.radius + 4);
	}

	p.makeShape = function () {}

	p.tick = function(event) {

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

		return this.alive;
	}

	p.checkCollision = function(event) {
		// check jet
		var target = window.jet;

		var distance = distanceBetweenPoints(this.wx, this.wy, target.wx, target.wy);

		if (distance < this.radius + target.radius) {
			target.destroy();
		}

		window.bulletEmitter.checkCollisionWithEnemy(this);
	}

	p.destroy = function() {
		this.alive = false;

		for(var i = 0; i < 5; i++) {
            var pVX = (Math.random() * 16 - 8);
            var pVY = (Math.random() * 16 - 8);

            window.particleEmitter.addParticle(this.wx, this.wy, pVX, pVY, 0.7 * 1000, this.color);
        }
	}

	window.Enemy = Enemy;
}(window))
