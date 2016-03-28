'use strict';

var squareShape = function(ctx, x, y) {
	this.x = x;
	this.y = y;
	this.c = ctx;
	var self = this;

	this.drawBasic = function() {
		self.c.beginPath();
		self.c.moveTo(0, BASE_SIZE);
		self.c.lineTo(2*BASE_SIZE, BASE_SIZE);

		self.c.moveTo(BASE_SIZE, 0);
		self.c.lineTo(BASE_SIZE, 2*BASE_SIZE);

		self.c.moveTo(0, 0);
		self.c.lineTo(0, 2*BASE_SIZE);

		self.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);
		self.c.lineTo(2*BASE_SIZE, 0);
		self.c.closePath();
		self.c.stroke();
	};

	this.draw = function() {
		self.c.save();
		self.c.translate(x, y);
		self.c.drawBasic();
		self.c.restore();
	};

	this.keyDownHandler = function(keyCode) {
		var x = self.x;
		var y = self.y;

		if (keyCode == 37) {	// left arrow
			self.x = self.x - BASE_SIZE;
		} else if (keyCode == 39) {	// right arrow
			self.x = self.x + BASE_SIZE;
		} else if (keyCode == 40) {	// down arrow
			self.y = self.y + BASE_SIZE;
		}
	};
}