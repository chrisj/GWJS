(function (window) {
    "use strict";

	function Jet(wx, wy) {
		this.initialize(wx, wy);
	}

	var p = Jet.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;
	p.jetBody;
	p.lastShotTime;


    p.lastParticleTime;

	p.radius;
    p.radiusSqr;

    p.emitter;

	p.initialize = function(wx, wy) {
		this.WorldObject_initialize(wx, wy);

        this.x = window.canvasWidth / 2;
        this.y = window.canvasHeight / 2;

		this.lastShotTime = 0;
        this.lastParticleTime = 0;
		this.radius = 20;
        this.radiusSqr = this.radius * this.radius;

		this.makeShape();
        this.cache(-this.radius - 2, -this.radius - 2, 2*this.radius + 4, 2*this.radius + 4);
	}

	p.makeShape = function () {
		var g = this.graphics;
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

            this.wx += vX;
            this.wy += vY;

            if (event.runTime - this.lastParticleTime > 20) {
                var pVX = -vX + (Math.random() * 2 - 1);
                var pVY = -vY + (Math.random() * 2 - 1);

                window.emitter.addParticle(this.wx, this.wy, pVX, pVY, 0.75 * 1000, "orange");
                this.lastParticleTime = event.runTime;
            }

            if (!this.inWorldBoundsX()) {
                if (this.wx > this.radius) {
                    this.wx = worldWidth - this.radius;
                } else {
                    this.wx = this.radius;
                }
            }

            if (! this.inWorldBoundsY()) {
            	if (this.wy > this.radius) {
                    this.wy = worldHeight - this.radius;
                } else {
                    this.wy = this.radius;
                }
            }

            var angle = Math.atan2(vY, vX);
            this.rotation = toDegrees(angle);

            // switch camera focus from jet to staying in bounds
            if (this.wx <= canvasWidth / 2) {
                this.x = this.wx;
            } else if (worldWidth - this.wx <= canvasWidth / 2) {
                this.x = canvasWidth - (worldWidth - this.wx);
            }

            if (this.wy <= canvasHeight / 2) {
                this.y = this.wy;
            } else if (worldHeight - this.wy <= canvasHeight / 2) {
                this.y = canvasHeight - (worldHeight - this.wy);
            }
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

        var newBullet = new Bullet(jet.wx, jet.wy, x, y);
        window.bullets.push(newBullet);
        window.stage.addChild(newBullet);
    }

    p.destroy = function () {
        var text = new createjs.Text("EXPLOSION!", "72px Arial", "#ff7700");
        text.x = window.worldWidth / 2;
        text.y = window.worldHeight / 2;
        window.stage.addChild(text);
        window.stage.update();

        window.pauseGame();
    }

	window.Jet = Jet;
}(window))
