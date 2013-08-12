(function (window) {

	function Bullet(wx, wy, vx, vy) {
		this.initialize(wx, wy, vx, vy);
	}

	var p = Bullet.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;
	p.bulletShape;

	p.vX;
	p.vY;
	p.active;
	p.decay;
	p.radius;

	p.initialize = function(wx, wy, vx, vy) {
		this.WorldObject_initialize(wx, wy);

		this.active = true;
		this.reset(wx, wy, vx, vy);
		this.decay = 1;
		this.radius = 4;


		this.bulletShape = new createjs.Shape();
		this.addChild(this.bulletShape);

		this.makeShape();

		var angle = Math.atan2(vy, vx);
		this.rotation = toDegrees(angle);
	}

	p.reset = function(wx, wy, vx, vy) {
		this.vX = vx;
		this.vY = vy;
	}

	p.makeShape = function () {
		var g = this.bulletShape.graphics;
		g.clear();
		g.beginFill("yellow").drawCircle(0, 0, this.radius);
	}

	p.tick = function(event) {
		this.wx += (event.delta / 1000) * this.vX * 800;
		this.wy += (event.delta / 1000) * this.vY * 800;

		this.updateCanvasPosition();



		this.reflect();
	}

    p.reflect = function() {
    	if (this.wx < 0 || this.wx > window.worldWidth) {
    		this.vX *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	if (this.wy < 0 || this.wy > window.worldHeight) {
    		this.vY *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	return false;
    }

	window.Bullet = Bullet;
}(window))
