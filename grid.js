(function (window) {

	function Grid() {
		this.initialize();
	}

	var p = Grid.prototype = new WorldObject();

	p.WorldObject_initialize = p.initialize;

	p.initialize = function() {
		this.WorldObject_initialize(0, 0);
        this.makeShape();
	}

	p.makeShape = function () {
		var g = this.shape.graphics;
		g.clear();
		g.beginStroke("#ffffff");
		g.setStrokeStyle(2);
        g.beginFill();

        g.drawRect(0, 0, worldWidth, worldHeight);

        g.setStrokeStyle(.5, "round");

        var pixelsPerGridWidth = worldWidth / gridColumns;
        var pixelsPerGridHeight = worldHeight / gridRows;

        for(var i = 0; i < gridColumns; i++) {
            g.moveTo(pixelsPerGridWidth * i, 0).lineTo(pixelsPerGridWidth * i, worldHeight);
        }

        for(var i = 0; i < gridRows; i++) {
            g.moveTo(0, pixelsPerGridHeight * i).lineTo(worldWidth, pixelsPerGridHeight * i);
        }
	}

	p.tick = function () {
		this.updateCanvasPosition();
	}

	window.Grid = Grid;
}(window))
