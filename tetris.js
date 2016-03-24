'use strict';
var canvas = $('#mainView')[0];
var dummy = '';

var context = canvas.getContext('2d');
var BASE_SIZE = 40;
context.globalCompositeOperation = 'copy';
context.strokeStyle='blue';

var drawIShape = function(c) {
	c.beginPath();
	c.moveTo(0, BASE_SIZE);
	c.lineTo(BASE_SIZE, BASE_SIZE);
	c.strokeStyle = 'blue';
	c.moveTo(0, 2*BASE_SIZE);
	c.lineTo(BASE_SIZE, 2*BASE_SIZE);
	c.moveTo(0, 3*BASE_SIZE);
	c.lineTo(BASE_SIZE, 3*BASE_SIZE);

	c.moveTo(0, 0);
	c.lineTo(0, 4*BASE_SIZE);
	c.lineTo(BASE_SIZE, 4*BASE_SIZE);
	c.lineTo(BASE_SIZE, 0);
	c.closePath();
	c.stroke();
};

var iShape1 = function(ctx, x, y) {
	ctx.save();
	ctx.translate(x, y);
	drawIShape(ctx);
	ctx.restore(ctx);
};

var iShape2 = function(ct, x, y) {
	ct.strokeStyle = 'rgb(0,0,0,)';
	iShape1(ct, x, y);
	ct.strokeStyle='blue';
	ct.save();
	ct.translate(x + 2*BASE_SIZE, y + 2*BASE_SIZE);
	ct.rotate(Math.PI/2);
	drawIShape(ct);
	ct.restore();
}

var ishape = iShape1(context, 200, 0);

$(document).keydown(function(event) {
	var keyCode = event.which;

	if(keyCode == 37 || keyCode == 39) {
		iShape2(context, 200, 0);
	}
});