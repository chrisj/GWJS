(function (window) {
	"use strict";

	function Star(x, y) {
		this.initialize(x, y);
	}

	var p = Star.prototype = new Enemy();

	p.Enemy_initialize = p.initialize;

	p.initialize = function(x, y) {
		this.Enemy_initialize(x, y, 15, 200);
		this.rotatesToTarget = false;
		this.makeAnimations();
	}

	p.makeShape = function () {
		var g = this.shape.graphics;
		g.clear();
		g.setStrokeStyle(2, "round").beginStroke("yellow").drawPolyStar(0, 0, this.radius, 5, .63, 0);
	}

	p.makeAnimations = function () {
		createjs.Tween.get(this,{loop:true}).to({rotation:360}, 1800);
	}

	// adds a zig zag pattern to movement

	p.tick = function(event) {
		if (this.active) {

			var target = window.jet;

			var deltax = target.wx - this.wx;
			var deltay = target.wy - this.wy;

			var angle = Math.atan2(deltay, deltax);

			var occTime = .5 * 1000;
			var lastFluxTime;
			var flux = 5;
			var random = Math.floor(Math.random() * 3);

        	if (event.runTime - lastFluxTime > occTime) {
            	flux *= -1;
            	lastSpawnTime = event.runTime;
        	}

			this.wx += (event.delta / 1000) * this.velocity * Math.cos(angle + flux);
			this.wy += (event.delta / 1000) * this.velocity * Math.sin(angle + flux);


			this.checkCollision();

			this.updateCanvasPosition();
		}
	}

	window.Star = Star;
}(window))
