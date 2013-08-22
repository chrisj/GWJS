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
	p.speed; // get rid of this since we are already initializing with vx and vy? or do the calculation here

	p.initialize = function(wx, wy, vx, vy) {
		this.WorldObject_initialize(wx, wy, 4);

		this.speed = 800;

		this.vX = vx * this.speed || 0;
		this.vY = vy * this.speed || 0;
		this.decay = 1;

		this.makeShape();
		this.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
	}

	p.reset = function(wx, wy, vx, vy) {
		this.wx = wx;
		this.wy = wy;
		this.vX = vx * this.speed;
		this.vY = vy * this.speed;
		this.decay = 1;
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

		if(this.decay > 0) {
			return true;
		} else {
			this.death(event);
			return false;
		}
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

    p.death = function(event) {
    	var bVX = (event.delta / 1000) * this.vX;
        var bVY = (event.delta / 1000) * this.vY;

        for(var i = 0; i < 3; i++) {
            var pVX = bVX + (Math.random() * 10 - 5);
            var pVY = bVY + (Math.random() * 10 - 5);

            window.particleEmitter.addParticle(this.wx, this.wy, pVX/3, pVY/3, 0.5 * 1000, "yellow");
        }
    }

	window.Bullet = Bullet;

	function BulletEmitter() { // TODO: combine this with particle emitter
		this.bulletPool = [];
		this.bulletCount = 0;
		this.maximumBullets = 100;

		for (var i = 0; i < this.maximumBullets; i++) {
			this.bulletPool.push(new Bullet())
		}
	}

	var ep = BulletEmitter.prototype;

		ep.tick = function(event) {

		var i = 0;

		while (i < this.bulletCount) {
			var bullet = this.bulletPool[i];
			if (bullet.tick(event)) {
				i++;
			} else {
				window.stage.removeChild(bullet);


				this.bulletPool[i] = this.bulletPool[this.bulletCount - 1];
				this.bulletPool[this.bulletCount - 1] = bullet;

				this.bulletCount--;
			}
		}
	}

	ep.addBullet = function(wx, wy, vx, vy) {
		if (this.bulletCount === this.maximumBullets) {
			return false;
		} else {
			var bullet = this.bulletPool[this.bulletCount];
			bullet.reset(wx, wy, vx, vy);

			window.stage.addChild(bullet);

			this.bulletCount++;
		}
	}

	ep.checkCollisionWithEnemy = function(enemy) {
		for(var i = 0; i < this.bulletCount; i++) {

			var bullet = this.bulletPool[i];

			var distance = distanceBetweenPoints(enemy.wx, enemy.wy, bullet.wx, bullet.wy);

			if (distance < enemy.radius + bullet.radius - 2) {
				enemy.destroy();
				break;
			}
		}
	}

	window.BulletEmitter = BulletEmitter;


}(window))
