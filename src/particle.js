(function (window) {
	"use strict";

	var Particle = WorldObject.makeSubclass();
	var p = Particle.prototype;

	p.vx;
	p.vy;
	p.life;
	p.color

	p.initialize = function(wx, wy, vx, vy, life, color) {
		WorldObject.prototype.initialize.call(this, wx, wy, 3);

		this.vx = vx || 0;
		this.vy = vy || 0;
		this.life = life || 0;
		this.color = color;

		this.makeShape();
		this.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
	}

	p.reset = function(wx, wy, vx, vy, life, color) {
		this.wx = wx;
		this.wy = wy;
		this.vx = vx;
		this.vy = vy;
		this.life = life;

		if (color !== this.color) {
			this.color = color;
			this.makeShape();
			this.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
		}

		this.alpha = 1;
		createjs.Tween.get(this,{loop:false}).to({alpha:0}, life);
	}

	p.makeShape = function() {
		var g = this.graphics;
		g.clear();
		g.beginFill(this.color).drawCircle(0, 0, this.radius);
	}

	p.tick = function() {
		this.life -= frameTime;

		if (this.life > 0) {
			this.wx += this.vx
			this.wy += this.vy;

			this.updateCanvasPosition();

			return true;
		}

		return false;
	}

	window.Particle = Particle;

	function ParticleEmitter() {
		this.particlePool = [];
		this.particleCount = 0;
		this.maximumParticles = 100;

		for (var i = 0; i < this.maximumParticles; i++) {
			this.particlePool.push(new Particle())
		}
	}

	var ep = ParticleEmitter.prototype;

	ep.tick = function() {

		var i = 0;

		while (i < this.particleCount) {
			var particle = this.particlePool[i];
			if (particle.tick()) {
				i++;
			} else {
				window.stage.removeChild(particle);


				this.particlePool[i] = this.particlePool[this.particleCount - 1];
				this.particlePool[this.particleCount - 1] = particle;

				this.particleCount--;
			}
		}
	}

	ep.addParticle = function(wx, wy, vx, vy, life, color) {
		if (this.particleCount === this.maximumParticles) {
			return false;
		} else {
			var particle = this.particlePool[this.particleCount];
			particle.reset(wx, wy, vx, vy, life, color);

			window.stage.addChild(particle);

			this.particleCount++;
		}
	}

	window.ParticleEmitter = ParticleEmitter;

}(window))
