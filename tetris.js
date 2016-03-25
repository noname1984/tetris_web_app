'use strict';
var canvas = $('#mainView')[0];

var context = canvas.getContext('2d');
var BASE_SIZE = 40;
var BLUE_COLOR = 'blue';
var WIDTH = 400;
var HEIGHT = 600;

context.strokeStyle = BLUE_COLOR;

var shapes = [];

var IShape = function(ctx, x, y) {
	this.x = x;
	this.y = y;
	this.c = ctx;
	this.isVertical = true;
	var self = this;

	this.drawVerticalBasic = function() {
		self.c.beginPath();
		self.c.moveTo(0, BASE_SIZE);
		self.c.lineTo(BASE_SIZE, BASE_SIZE);
		self.c.moveTo(0, 2*BASE_SIZE);
		self.c.lineTo(BASE_SIZE, 2*BASE_SIZE);
		self.c.moveTo(0, 3*BASE_SIZE);
		self.c.lineTo(BASE_SIZE, 3*BASE_SIZE);

		self.c.moveTo(0, 0);
		self.c.lineTo(0, 4*BASE_SIZE);
		self.c.lineTo(BASE_SIZE, 4*BASE_SIZE);
		self.c.lineTo(BASE_SIZE, 0);
		self.c.closePath();
		self.c.stroke();
	};

	this.drawHorizontalBasic = function() {
		self.c.beginPath();
		self.c.moveTo(BASE_SIZE, 0);
		self.c.lineTo(BASE_SIZE, BASE_SIZE);
		self.c.moveTo(2*BASE_SIZE, 0);
		self.c.lineTo(2*BASE_SIZE, BASE_SIZE);
		self.c.moveTo(3*BASE_SIZE, 0);
		self.c.lineTo(3*BASE_SIZE, BASE_SIZE);

		self.c.moveTo(0, 0);
		self.c.lineTo(4*BASE_SIZE, 0);
		self.c.lineTo(4*BASE_SIZE, BASE_SIZE);
		self.c.lineTo(0, BASE_SIZE);
		self.c.closePath();
		self.c.stroke();
	};

	this.vertical = function() {
		self.c.save();
		self.c.translate(self.x, self.y);
		self.drawVerticalBasic();
		self.c.restore();
		self.isVertical = true;
	};

	this.horizontal = function() {
		self.c.save();
		self.c.translate(self.x, self.y);
		self.drawHorizontalBasic();
		self.c.restore();
		self.isVertical = false;
	};

	this.draw = function() {
		if (self.isVertical) {
			self.vertical();
		} else {
			self.horizontal();
		}
	};
};

var ishape1 = new IShape(context, 50, 0);
shapes.push(ishape1);

// draw initial line
var ishape = new IShape(context, 200, 0);
shapes.push(ishape);

var drawView = function() {
	for(var i = 0; i < shapes.length; i++) {
		shapes[i].draw();
	}
};

var clearView = function() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
};

drawView();

$(document).keydown(function(event) {
	clearView();
	var keyCode = event.which;
	var last = shapes[shapes.length-1];
	var x = last.x;
	var y = last.y;

	if (keyCode == 37) {	// left arrow
		last.x = x - BASE_SIZE;
	} else if(keyCode == 38) {	// up arrow
		var last = shapes[shapes.length-1];
		if (last.isVertical) {
			last.x = x - 2*BASE_SIZE;
			last.y = y + 2*BASE_SIZE;
			last.isVertical = false;
		} else {
			last.x = x + 2*BASE_SIZE;
			last.y = y - 2*BASE_SIZE;
			last.isVertical = true;
		}
	} else if (keyCode == 39) {	// right arrow
		last.x = x + BASE_SIZE;
	} else if (keyCode == 40) {	// down arrow
		last.y = y + BASE_SIZE;
	}
	drawView();
});