(function (window) {

	function Jet(x, y) {
		this.initialize(x, y);
	}

	var p = Jet.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.jetBody;
	p.lastShotTime;
	p.radius;
    p.radiusSqr;

	p.initialize = function(x, y) {
		this.Container_initialize();

        this.x = x;
        this.y = y;
		this.lastShotTime = 0;
		this.radius = 20;
        this.radiusSqr = this.radius * this.radius;

		this.jetBody = new createjs.Shape();
		this.addChild(this.jetBody);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.jetBody.graphics;
		g.clear();
        // g.setStrokeStyle(2, "round").beginStroke("red").drawCircle(0, 0, this.radius);

        g.setStrokeStyle(3, "round").beginStroke("orange");

        var startAngle = toRadians(40);
        var endAngle = toRadians(360 - 40);

        g.arc(0, 0, 20, startAngle, endAngle);

        g.moveTo(Math.cos(startAngle) * this.radius, Math.sin(startAngle) * this.radius);
        g.lineTo(0, 3 * this.radius / 5);
        g.lineTo(this.radius / 4, 0);
        g.lineTo(0 / 4, -3 * this.radius / 5);
        g.lineTo(Math.cos(endAngle) * this.radius, Math.sin(endAngle) * this.radius);
	}

	p.tick = function (event) {

        var leftMagnitude = distanceToOrigin(window.leftStickX, window.leftStickY);

        if (leftMagnitude > .3) {
        	var vX = (event.delta / 1000) * window.leftStickX * 300;
        	var vY = (event.delta / 1000) * window.leftStickY * 300;

            if (leftMagnitude > 1) {
                vX /= leftMagnitude;
                vY /= leftMagnitude;
            }

            this.x += vX;
            this.y += vY;

            if (!this.inBoundsX()) {
            	this.x -= vX;
            }

            if (! this.inBoundsY()) {
            	this.y -= vY;
            }

            var angle = Math.atan2(vY, vX);
            this.rotation = toDegrees(angle);
        }

        // fire bullet
        if (event.runTime - this.lastShotTime > 200 && distanceToOrigin(window.rightStickX, window.rightStickY) > .3) {
            this.shoot();
            this.lastShotTime = event.runTime;
        }
    }

    p.shoot = function () {
        // normalize
        var rightMagnitude = distanceToOrigin(window.rightStickX, window.rightStickY);

        var x = rightStickX/rightMagnitude;
        var y = rightStickY/rightMagnitude;

        // random shot
        // var randomAngle = Math.random() * 0.0873 - 0.0436;
        // var cos = Math.cos(randomAngle);
        // var sin = Math.sin(randomAngle);

        // var dX = x * cos - y * sin;
        // var dY = x * sin + y * cos;

        var newBullet = new Bullet(jet.x, jet.y, x, y);
        window.bullets.push(newBullet);
        window.stage.addChild(newBullet);
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
        return this.inBoundsX() && this.inBoundsY();
    }

    p.inBoundsX = function() {
        return this.x - this.radius > 0 && this.x + this.radius <= window.canvasWidth;
    }

	p.inBoundsY = function() {
        return this.y - this.radius > 0 && this.y + this.radius <= window.canvasHeight;
    }

	window.Jet = Jet;
}(window))
