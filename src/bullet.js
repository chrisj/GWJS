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
	p.speed;

	p.initialize = function(wx, wy, vx, vy) {
		this.WorldObject_initialize(wx, wy, 4);

		this.speed = 800;

		this.vX = vx * this.speed;
		this.vY = vy * this.speed;
		this.decay = 1;

		this.makeShape();
		this.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
	}

	p.reset = function(wx, wy, vx, vy) {
		this.wx = wx;
		this.wy = wy;
		this.vX = vx * this.speed;
		this.vY = vy * this.speed;
	}

	p.makeShape = function () {
		var g = this.graphics;
		g.clear();
		g.beginFill("yellow").drawCircle(0, 0, this.radius);
	}

	p.tick = function(event) {
		this.wx += (event.delta / 1000) * this.vX;
		this.wy += (event.delta / 1000) * this.vY;

		this.updateCanvasPosition();
		this.reflect();

		return this.decay > 0;
	}

    p.reflect = function() {
    	if (!this.inWorldBoundsX()) {

    		if (this.wx < this.radius) {
    			this.wx = 0;
    		} else {
    			this.wx = worldWidth;
    		}

    		this.vX *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	if (!this.inWorldBoundsY()) {

  			if (this.wy < this.radius) {
    			this.wy = 0;
    		} else {
    			this.wy = worldHeight;
    		}


    		this.vY *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	return false;
    }

	window.Bullet = Bullet;
}(window))
