(function (window) {

	function WorldObject(wx, wy, radius) {
		this.initialize(wx, wy, radius);
	}

	var p = WorldObject.prototype = new createjs.Shape();

	p.Shape_initialize = p.initialize;

	p.wx;
	p.wy;
	p.radius;

	p.initialize = function(wx, wy, radius) {
		this.Shape_initialize();

		this.wx = wx;
		this.wy = wy;
		this.radius = radius;
	}

	p.updateCanvasPosition = function() {
		var jet = window.jet;
		this.x = jet.x + this.wx - jet.wx;
		this.y = jet.y + this.wy - jet.wy;
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
