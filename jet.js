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
        g.setStrokeStyle(3, "round").beginStroke("red");//.drawCircle(0, 0, this.radius);

        // g.arc(0, 0, 20, Math.PI / 4, Math.PI*2 - Math.PI / 4);

        g.setStrokeStyle(3, "round").beginStroke("orange");

        // g.moveTo(-this.radius, 0).lineTo(0, -this.radius);
        // g.lineTo(this.radius, -this.radius / 2);
        // g.lineTo(0, -this.radius / 2);

        // g.lineTo(this.radius / 4, 0);

        // g.lineTo(0, this.radius / 2);
        // g.lineTo(this.radius, this.radius / 2);
        // g.lineTo(0, this.radius);
        // g.lineTo(-this.radius, 0);

        //this.designOne(g);
        //this.designTwo(g);
        this.designThree(g);


	}

    p.designThree = function (g) {
        // g.moveTo(0, 0);

        var startAngle = toRadians(30);
        var endAngle = toRadians(360 - 30);

        g.arc(0, 0, 20, startAngle, endAngle);

        g.moveTo(Math.cos(startAngle) * this.radius, Math.sin(startAngle) * this.radius);
        g.lineTo(0, 3 * this.radius / 5);
        g.lineTo(-this.radius / 4, 0);
        g.lineTo(0 / 4, -3 * this.radius / 5);
        g.lineTo(Math.cos(endAngle) * this.radius, Math.sin(endAngle) * this.radius);
    }

    p.designOne = function (g) {
        g.moveTo(-this.radius, 0).lineTo(0, -this.radius);
        g.lineTo(this.radius, -this.radius / 2);
        g.lineTo(this.radius / 2, -this.radius / 2);

        g.lineTo(0, 0);

        g.lineTo(this.radius / 2, this.radius / 2);
        g.lineTo(this.radius, this.radius / 2);
        g.lineTo(0, this.radius);
        g.lineTo(-this.radius, 0);
    }

    p.designTwo = function (g) {
        g.moveTo(-this.radius, 0).lineTo(0, -this.radius);
        g.lineTo(this.radius, -this.radius / 2);
        g.lineTo(0, -this.radius / 2);

        g.lineTo(this.radius / 4, 0);

        g.lineTo(0, this.radius / 2);
        g.lineTo(this.radius, this.radius / 2);
        g.lineTo(0, this.radius);
        g.lineTo(-this.radius, 0);
    }

	p.makeAnimations = function () {
		createjs.Tween.get(this,{loop:true}).to({scaleX:1.2,scaleY:1.2},1000,createjs.Ease.quadOut).to({scaleX:1,scaleY:1},1000,createjs.Ease.quadIn);
	}

	p.tick = function (event) {
        if (distanceToOrigin(window.leftStickX, window.leftStickY) > .3) {
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

            var angle = Math.atan2(vY, vX);
            this.rotation = toDegrees(angle);
        }

        // fire bullet
        if (this.reload === 0 && distanceToOrigin(window.rightStickX, window.rightStickY) > .3) {
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

        // var angle = Math.atan2(rightStickY, rightStickX);
        // this.rotation = toDegrees(angle);
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
