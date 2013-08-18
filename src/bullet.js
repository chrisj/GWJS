(function (window) {
	"use strict";

	function Bullet(wx, wy, vx, vy) {
		this.initialize(wx, wy, vx, vy);
	}

	var p = Bullet.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;

	p.vX;
	p.vY;
	p.decay;

	p.initialize = function(wx, wy, vx, vy) {
		this.WorldObject_initialize(wx, wy, 4);

		this.vX = vx;
		this.vY = vy;
		this.decay = 1;

		this.makeShape();
		this.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
	}

	p.reset = function(wx, wy, vx, vy) {
		this.wx = wx;
		this.wy = wy;
		this.vX = vx;
		this.vY = vy;
	}

	p.makeShape = function () {
		var g = this.graphics;
		g.clear();
		g.beginFill("yellow").drawCircle(0, 0, this.radius);
	}

	p.tick = function(event) {
		this.wx += (event.delta / 1000) * this.vX * 800;
		this.wy += (event.delta / 1000) * this.vY * 800;

		this.updateCanvasPosition();
		this.reflect();

		return this.decay > 0;
	}

    p.reflect = function() {
    	if (!this.inWorldBoundsX()) {
    		this.vX *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	if (!this.inWorldBoundsY()) {
    		this.vY *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	return false;
    }

	window.Bullet = Bullet;
}(window))
