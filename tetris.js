'use strict';
var canvas = $('#mainView')[0];

var context = canvas.getContext('2d');
context.strokeStyle = BLUE_COLOR;

var shapes = [];

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
	last.keyDownHandler(keyCode);
	drawView();
});