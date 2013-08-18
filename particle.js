(function (window) {
	"use strict";

	function Particle(wx, wy, vx, vy, life) {
		this.initialize(wx, wy, vx, vy);
	}

	var p = Particle.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;

	p.vx;
	p.vy;
	p.life;

	p.initialize = function(wx, wy, vx, vy, life) {
		this.WorldObject_initialize(wx, wy, 3);

		this.vx = vx || 0;
		this.vy = vy || 0;
		this.life = life || 0;

		this.makeShape();
		this.cache(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
	}

	p.reset = function(wx, wy, vx, vy, life) {
		this.wx = wx;
		this.wy = wy;
		this.vx = vx;
		this.vy = vy;
		this.life = life;

		this.alpha = 1;
		createjs.Tween.get(this,{loop:false}).to({alpha:0}, life);
	}

	p.makeShape = function() {
		var g = this.graphics;
		g.clear();
		g.beginFill("red").drawCircle(0, 0, this.radius);
	}

	// p.makeAnimations = function () {
	// 	createjs.Tween.get(this,{loop:false}).to({rotation:360}, 3000);
	// }

	p.tick = function(event) {
		this.life -= event.delta;

		if (this.life > 0) {
			this.wx += this.vx
			this.wy += this.vy;

			this.updateCanvasPosition();

			return true;
		}

		return false;
	}

	window.Particle = Particle;

	function Emitter() {
		this.particlePool = [];
		this.particleCount = 0;
		this.totalParticles = 100;

		for (var i = 0; i <this.totalParticles; i++) {
			this.particlePool.push(new Particle())
		}
	}

	var ep = Emitter.prototype;

	ep.tick = function(event) {

		var i = 0;

		while (i < this.particleCount) {
			var particle = this.particlePool[i];
			if (particle.tick(event)) {
				i++;
			} else {
				window.stage.removeChild(particle);


				this.particlePool[i] = this.particlePool[this.particleCount - 1];
				this.particlePool[this.particleCount - 1] = particle;

				this.particleCount--;
			}
		}
	}

	ep.addParticle = function(wx, wy, vx, vy, life) {
		if (this.particleCount == this.totalParticles) {
			return false;
		} else {
			var particle = this.particlePool[this.particleCount];
			particle.reset(wx, wy, vx, vy, life);

			window.stage.addChild(particle);

			this.particleCount++;
		}
	}


	window.Emitter = Emitter;

}(window))
