'use strict';
var canvas = $('#mainView')[0];
var dummy = '';

var context = canvas.getContext('2d');

var shapes = [];

// draw initial line
var ishape = new IShape(context, 2, 2, 160, 40, 0, 2);
//shapes.push(ishape);

var tshape = new TShape(context, 2, 2, 120, 80, 0, 4);
//shapes.push(tshape);

var square = new SquareShape(context, 2, 2, 80, 80, 1, 1);
//shapes.push(square);

var leftL = new LeftLShape(context, 2, 2, 120, 80, 0, 4);
//shapes.push(leftL);

var rightL = new RightLShape(context, 2, 2, 120, 80, 0, 4);
//shapes.push(rightL);

var leftZ = new LeftZShape(context, 178, 2, 120, 80, 0, 2);
//shapes.push(leftZ);

var rightZ = new RightZShape(context, 178, 2, 120, 80, 0, 2);
shapes.push(rightZ);

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