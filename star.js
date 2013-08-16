(function (window) {

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

	window.Star = Star;
}(window))
