(function (window) {
	"use strict";

	var WorldObject = createjs.Shape.makeSubclass();
	var p = WorldObject.prototype;

	p.wx;
	p.wy;
	p.radius;

	p.initialize = function(wx, wy, radius) {
		createjs.Shape.prototype.initialize.call(this);

		this.wx = wx;
		this.wy = wy;
		this.radius = radius;
	}

	p.updateCanvasPosition = function() {
		var target = window.camera.target;
		this.x = target.x + this.wx - target.wx;
		this.y = target.y + this.wy - target.wy;
	}

	p.inWorldBounds = function() {
        return this.inWorldBoundsX() && this.inWorldBoundsY();
    }

    p.inWorldBoundsX = function() {
        return this.wx - this.radius > 0 && this.wx + this.radius <= window.worldWidth;
    }

	p.inWorldBoundsY = function() {
        return this.wy - this.radius > 0 && this.wy + this.radius <= window.worldHeight;
    }

	window.WorldObject = WorldObject;
}(window))
