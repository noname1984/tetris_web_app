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

var loop = function (){
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

		let testResult = testMove(last, 'down');

		if (testResult) {
			clearView();
			last.y = y + BASE_SIZE + PADDING;
			drawView();
		} else {
			clearInterval(lastShapeTimer);
			loop();
		}
	}, 1000);
};

loop();

function testMove(shape, actionName) {
	let units = shape.unitArr;
	let u0 = units[0];
	let u1 = units[1];
	let u2 = units[2];
	let u3 = units[3];
	let y = shape.y;

	let tempSize = BASE_SIZE + PADDING;
	let newHeight = (shape.state%2 == 0) ? (y + tempSize + shape.h) : (y + tempSize + shape.w);

	let u0y_bottom = u0.bl[1] + PADDING;
	let u1y_bottom = u1.bl[1] + PADDING;
	let u2y_bottom = u2.bl[1] + PADDING;
	let u3y_bottom = u3.bl[1] + PADDING;

	if (unitCoors[u0y_bottom]) {
		for(var i = 0; i < unitCoors[u0y_bottom].length; i++) {
			let tempUnit = unitCoors[u0y_bottom][i];
			let comp = (actionName === 'down') ? compareUnits(tempUnit, u0) : overlapUnits(tempUnit, u0);
			if (comp) {
				shape.addShapeSquaresToDrawnList();
				return false;
			}
		}
	}

	if (unitCoors[u1y_bottom]) {
		for(var i = 0; i < unitCoors[u1y_bottom].length; i++) {
			let tempUnit = unitCoors[u1y_bottom][i];
			let comp = (actionName === 'down') ? compareUnits(tempUnit, u1) : overlapUnits(tempUnit, u1);
			if (comp) {
				shape.addShapeSquaresToDrawnList();
				return false;
			}
		}
	}

	if (unitCoors[u2y_bottom]) {
		for(var i = 0; i < unitCoors[u2y_bottom].length; i++) {
			let tempUnit = unitCoors[u2y_bottom][i];
			let comp = (actionName === 'down') ? compareUnits(tempUnit, u2) : overlapUnits(tempUnit, u2);
			if (comp) {
				shape.addShapeSquaresToDrawnList();
				return false;
			}
		}
	}

	if (unitCoors[u3y_bottom]) {
		for(var i = 0; i < unitCoors[u3y_bottom].length; i++) {
			let tempUnit = unitCoors[u3y_bottom][i];
			let comp = (actionName === 'down') ? compareUnits(tempUnit, u3) : overlapUnits(tempUnit, u3);
			if (comp) {
				shape.addShapeSquaresToDrawnList();
				return false;
			}
		}
	}

	if (newHeight <= HEIGHT) {
		return true;
	} else {
		shape.addShapeSquaresToDrawnList();

		return false;
	}
}

function addToDrawnList(U) {
	let Uy_top = U.tl[1];
	if (!unitCoors[Uy_top]) {
		unitCoors[Uy_top] = [];
		unitCoors[Uy_top].push(U);
	} else {
		unitCoors[Uy_top].push(U);
	}
}

function compareUnits(down, up) {
	if (down.tl[0] == up.bl[0] && down.tl[1] == (up.bl[1]+PADDING) && down.tr[0] == up.br[0] && down.tr[1] == (up.br[1]+PADDING)) {
		return true;
	} else {
		return false;
	}
}

function overlapUnits(u1, u2) {
	if (u1.tl[0] == u2.tl[0] && u1.tl[1] == u2.tl[1] && u1.tr[0] == u2.tr[0] && u1.tr[1] == u2.tr[1]) {
		return true;
	} else {
		return false;
	}
}

$(document).keydown(function(event) {
	clearView();
	var keyCode = event.which;
	var last = shapes[shapes.length-1];
	if(!last.keyDownHandler(keyCode)) {
		loop();
	}
	drawView();
});