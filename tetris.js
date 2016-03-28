'use strict';
var canvas = $('#mainView')[0];

var context = canvas.getContext('2d');

var shapes = [];

// draw initial line
var ishape = new IShape(context, 0, 0, 0, 2);
shapes.push(ishape);

var tshape = new TShape(context, 160, 0, 0, 4);
shapes.push(tshape);

var square = new SquareShape(context, 0, 50, 1, 1);
//shapes.push(square);

var leftL = new LeftLShape(context, 50, 50, 0, 4);
//shapes.push(leftL);

var rightL = new RightLShape(context, 0, 100, 0, 4);
//shapes.push(rightL);

var leftZ = new LeftZShape(context, 50, 100, 0, 2);
//shapes.push(leftZ);

var rightZ = new RightZShape(context, 0, 150, 0, 2);
//shapes.push(rightZ);

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