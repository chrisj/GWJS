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

	p.initialize = function(x, y, vx, vy) {
		this.Container_initialize();

		this.active = true;
		this.reset(x, y, vx, vy);


		this.bulletShape = new createjs.Shape();
		this.addChild(this.bulletShape);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.bulletShape.graphics;
		g.clear();
		g.beginFill("blue").drawCircle(0, 0, 4);
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
	}

	p.inBounds = function() {
        return this.x > 0 && this.y > 0 && this.x <= window.canvasWidth && this.y <= window.canvasHeight;
    }

	window.Bullet = Bullet;
}(window))