(function (window) {
    "use strict";

    function Camera(target) {
    	this.target = target;
    }

    var p = Camera.prototype;

   	p.tick = function () {
		// switch camera focus from jet to staying in bounds
        if (canvasWidth >= worldWidth) {
            this.target.x = (canvasWidth / 2) + (this.target.wx - (worldWidth / 2));
        } else if (this.target.wx <= canvasWidth / 2) {
            this.target.x = this.target.wx;
        } else if (worldWidth - this.target.wx <= canvasWidth / 2) {
            this.target.x = canvasWidth - (worldWidth - this.target.wx);
        }

        if (canvasHeight >= worldHeight) {
            this.target.y = (canvasHeight / 2) + (this.target.wy - (worldHeight / 2));
        } else if (this.target.wy <= canvasHeight / 2) {
            this.target.y = this.target.wy;
        } else if (worldHeight - this.target.wy <= canvasHeight / 2) {
            this.target.y = canvasHeight - (worldHeight - this.target.wy);
        }
   	}

    window.Camera = Camera;
}(window))
