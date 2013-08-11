(function (window) {

	function Bullet(x, y, vx, vy) {
		this.initialize(x, y, vx, vy);
	}

	var p = Bullet.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.bulletShape;

	p.vX;
	p.vY;
	p.active;
	p.decay;
	p.radius;

	p.initialize = function(x, y, vx, vy) {
		this.Container_initialize();

		this.active = true;
		this.reset(x, y, vx, vy);
		this.decay = 1;
		this.radius = 4;


		this.bulletShape = new createjs.Shape();
		this.addChild(this.bulletShape);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.bulletShape.graphics;
		g.clear();
		g.beginFill("yellow").drawCircle(0, 0, this.radius);
	}

	p.reset = function(x, y, vx, vy) {
		this.x = x;
		this.y = y;
		this.vX = vx;
		this.vY = vy;
	}

	p.tick = function(event) {
		this.x += this.vX;
		this.y += this.vY;
		this.reflect();
	}

	p.inBounds = function() {
        return this.x > 0 && this.y > 0 && this.x <= window.canvasWidth && this.y <= window.canvasHeight;
    }

    p.reflect = function() {
    	if (this.x < 0 || this.x > window.canvasWidth) {
    		this.vX *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	if (this.y < 0 || this.y > window.canvasHeight) {
    		this.vY *= -1;
    		this.decay -= 1;
    		return true;
    	}
    	return false;
    }

	window.Bullet = Bullet;
}(window))
