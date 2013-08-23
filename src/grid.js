(function (window) {
	"use strict";

	var Grid = WorldObject.makeSubclass();
	var p = Grid.prototype;

	p.initialize = function() {
		WorldObject.prototype.initialize.call(this, 0, 0);
        this.makeShape();
        this.cache(-5,-5,worldWidth+5, worldHeight+5);
	}

	p.makeShape = function () {
		var g = this.graphics;
		g.beginStroke("#ffffff");
		g.setStrokeStyle(2);
        g.beginFill();

        g.drawRect(0, 0, worldWidth, worldHeight);
        g.setStrokeStyle(.5, "round");

        var pixelsPerGridWidth = worldWidth / gridColumns;
        var pixelsPerGridHeight = worldHeight / gridRows;

        for(var i = 1; i < gridColumns; i++) {
            g.moveTo(pixelsPerGridWidth * i, 0).lineTo(pixelsPerGridWidth * i, worldHeight);
        }

        for(var i = 1; i < gridRows; i++) {
            g.moveTo(0, pixelsPerGridHeight * i).lineTo(worldWidth, pixelsPerGridHeight * i);
        }
	}

	p.tick = function () {
		this.updateCanvasPosition();
	}

	window.Grid = Grid;
}(window))
