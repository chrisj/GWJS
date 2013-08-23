(function (window) {
	"use strict";

	var Square = Enemy.makeSubclass();
	var p = Square.prototype;

	p.initialize = function(x, y) {
		Enemy.prototype.initialize.call(this, x, y, 20, 150, "cyan");
		this.rotatesToTarget = false;
		this.makeAnimations();
	}

	p.makeShape = function () {
		var g = this.graphics;
		var size = Math.sqrt(this.radius * this.radius / 2) * 2;
		g.setStrokeStyle(2, "round").beginStroke(this.color).drawRect(-size/2, -size/2, size, size);
	}

	p.makeAnimations = function () {
		createjs.Tween.get(this,{loop:true}).to({rotation:360}, 3000);
	}

	window.Square = Square;
}(window))
