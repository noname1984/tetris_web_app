'use strict';
var canvas = $('#mainView')[0];

var context = canvas.getContext('2d');

var shapes = [];
var unitCoors = {};

function drawView() {
	for(var i = 0; i < shapes.length; i++) {
		shapes[i].draw();
	}
};

function clearView() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
};

(function loop() {
	let randomType = Math.floor(Math.random()*7);
	switch(randomType) {
		case 0:
			let units0 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_1), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_1),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_1),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_1)
			];
			shapes.push(new IShape(context, START_X, START_Y, 160, 40, 0, 2, units0));
			break;
		case 1:
			let units1 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_2), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_2),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_2),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_2)
			];
			shapes.push(new TShape(context, START_X, START_Y, 120, 80, 0, 4, units1));
			break;
		case 2:
			let units2 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_3), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_3),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_3),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_3)
			];
			shapes.push(new SquareShape(context, START_X, START_Y, 80, 80, 1, 1, units2));
			break;
		case 3:
			let units3 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_4), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_4),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_4),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_4)
			];
			shapes.push(new LeftLShape(context, START_X, START_Y, 120, 80, 0, 4, units3));
			break;
		case 4:
			let units4 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_5), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_5),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_5),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_5)
			];
			shapes.push(new RightLShape(context, START_X, START_Y, 120, 80, 0, 4, units4));
			break;
		case 5:
			let units5 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_6), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_6),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_6),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_6)
			];
			shapes.push(new LeftZShape(context, START_X, START_Y, 120, 80, 0, 2, units5));
			break;
		case 6:
			let units6 = [
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_7), 
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_7),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_7),
				new UnitSquare(context, [0,0], [0,0], [0,0], [0,0], COLOR_7)
			];
			shapes.push(new RightZShape(context, START_X, START_Y, 120, 80, 0, 2, units6));
			break;
	}

	drawView();
	let last = shapes[shapes.length-1];
	let lastShapeTimer = setInterval(function() {
		let y = last.y;
		let tempSize = BASE_SIZE + 4;
		let units = last.units;
		let u0 = units[0];
		let u1 = units[1];
		let u2 = units[2];
		let u3 = units[3];

		let newHeight = (last.state%2 == 0) ? (y+BASE_SIZE+4+last.h) : (y+BASE_SIZE+4+last.w);

		if (u0.bl[1] + tempSize <= HEIGHT && u)
		//if (newHeight <= HEIGHT) {
			clearView();
			last.y = y + BASE_SIZE + 4;
			drawView();
		} else {
			clearInterval(lastShapeTimer);
			loop();
		}
	}, 1000);
})();

$(document).keydown(function(event) {
	clearView();
	var keyCode = event.which;
	var last = shapes[shapes.length-1];
	if(!last.keyDownHandler(keyCode)) {
		loop();
	}
	drawView();
});