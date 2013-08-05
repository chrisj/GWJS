(function (window) {

	function Jet() {
		this.initialize();
	}

	var p = Jet.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.jetBody;
	p.reload;

	p.radius;

	p.initialize = function() {
		this.Container_initialize();

		this.reload = 0;
		this.radius = 20;

		this.jetBody = new createjs.Shape();
		this.addChild(this.jetBody);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.jetBody.graphics;
		g.clear();
		g.setStrokeStyle(2, "round").beginStroke("red").drawCircle(0, 0, this.radius);
	}

	p.tick = function (event) {
        if (distanceToOrigin(window.leftStickX, window.leftStickY) > .5) {
        	var vX = window.leftStickX * 15;
        	var vY = window.leftStickY * 15;

            this.x += vX;
            this.y += vY;

            if (!this.inBounds()) {
            	this.x -= vX;
            	this.y -= vY;
            }
        }

        // fire bullet
        if (this.reload == 0 && distanceToOrigin(window.rightStickX, window.rightStickY) > .3) {
            var newBullet = new Bullet(jet.x, jet.y, rightStickX * 20, rightStickY * 20);
            window.bullets.push(newBullet);
            window.stage.addChild(newBullet);

            this.reload = 3;
        }

        if (this.reload > 0) {
        	this.reload -= 1;
        }
    }

    p.destroy = function () {
        var text = new createjs.Text("EXPLOSION!", "72px Arial", "#ff7700");
        text.x = window.canvasWidth / 2;
        text.y = window.canvasHeight / 2;
        window.stage.addChild(text);
        window.stage.update();

        window.pauseGame();
    }

    p.inBounds = function() {
        return this.x - this.radius > 0 && this.y - this.radius > 0 && this.x + this.radius <= window.canvasWidth && this.y + this.radius <= window.canvasHeight;
    }

	window.Jet = Jet;
}(window))