(function (window) {
	"use strict";

	var occTime = 0.05 * 1000;
	var lastFluxTime;

	function Star(x, y) {
		this.initialize(x, y);
	}

	var p = Star.prototype = new Enemy();

	p.Enemy_initialize = p.initialize;

	p.lastFluxTime;
	p.occTime;
	p.flux;

	p.initialize = function(x, y) {
		this.Enemy_initialize(x, y, 15, 200, "yellow");
		this.rotatesToTarget = false;
		this.makeAnimations();
		this.lastFluxTime = 0;
		this.occTime = .9 * 1000;
		this.flux = toRadians(30);
	}

	p.makeShape = function () {
		var g = this.graphics;
		g.clear();
		g.setStrokeStyle(2, "round").beginStroke(this.color).drawPolyStar(0, 0, this.radius, 5, .63, 0);
	}

	p.makeAnimations = function () {
		createjs.Tween.get(this,{loop:true}).to({rotation:360}, 1800);
	}

	// adds a zig zag pattern to movement

	p.tick = function(event) {
		var target = window.jet;

		var deltax = target.wx - this.wx;
		var deltay = target.wy - this.wy;

		var angle = Math.atan2(deltay, deltax);

		if (event.runTime - this.lastFluxTime > this.occTime) {
	    	this.flux *= -1;
	    	this.lastFluxTime = event.runTime;
		}

		this.wx += (event.delta / 1000) * this.velocity * Math.cos(angle + this.flux);
		this.wy += (event.delta / 1000) * this.velocity * Math.sin(angle + this.flux);


		this.checkCollision();

		this.updateCanvasPosition();

		return this.alive;
	}

	window.Star = Star;
}(window))
