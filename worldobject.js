(function (window) {

	function WorldObject(wx, wy, radius, velocity) {
		this.initialize(wx, wy, radius, velocity);
	}

	var p = WorldObject.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.shape;
	p.active;
	p.radius;

	p.wx;
	p.wy;

	p.initialize = function(wx, wy, radius, velocity) {
		this.Container_initialize();

		this.wx = wx;
		this.wy = wy;
		this.radius = radius;

		this.shape = new createjs.Shape();
		this.addChild(this.shape);
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
