(function (window) {

	function Jet() {
		this.initialize();
	}

	var p = Jet.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.jetBody;

	p.initialize = function() {
		this.Container_initialize();

		this.jetBody = new createjs.Shape();
		this.addChild(this.jetBody);

		this.makeShape();
	}

	p.makeShape = function () {
		var g = this.jetBody.graphics;
		g.clear();
		g.beginFill("red").drawCircle(0, 0, 20);
	}

	window.Jet = Jet;
}(window))