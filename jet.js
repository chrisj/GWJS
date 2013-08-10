(function (window) {

	function Jet() {
		this.initialize();
	}

	var p = Jet.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.jetBody;
	p.reload;

	p.radius;

	p.initialize = function() {
		this.Container_initialize();

		this.reload = 0;
		this.radius = 20;

		this.jetBody = new createjs.Shape();
		this.addChild(this.jetBody);

		this.makeShape();
		// this.makeAnimations();
	}

	p.makeShape = function () {
		var g = this.jetBody.graphics;
		g.clear();
		g.setStrokeStyle(3, "round").beginStroke("red").drawCircle(0, 0, this.radius);
	}

	p.makeAnimations = function () {
		createjs.Tween.get(this,{loop:true}).to({scaleX:1.2,scaleY:1.2},1000,createjs.Ease.quadOut).to({scaleX:1,scaleY:1},1000,createjs.Ease.quadIn);
	}

	p.tick = function (event) {
        if (distanceToOrigin(window.leftStickX, window.leftStickY) > .5) {
        	var vX = window.leftStickX * 8;
        	var vY = window.leftStickY * 8;

            this.x += vX;
            this.y += vY;

            if (!this.inBoundsX()) {
            	this.x -= vX;
            }

            if (! this.inBoundsY()) {
            	this.y -= vY;
            }
        }

        // fire bullet
        if (this.reload == 0 && distanceToOrigin(window.rightStickX, window.rightStickY) > .3) {
            this.shoot();
        }

        if (this.reload > 0) {
        	this.reload -= 1;
        }
    }

    p.shoot = function () {
        // normalize
        var rightMagnitude = distanceToOrigin(window.rightStickX, window.rightStickY);
        var newBullet = new Bullet(jet.x, jet.y, rightStickX/rightMagnitude * 20, rightStickY/rightMagnitude * 20);
        window.bullets.push(newBullet);
        window.stage.addChild(newBullet);

        this.reload = 3;
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