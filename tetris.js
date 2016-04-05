'use strict';
var canvas = $('#mainView')[0];
var context = canvas.getContext('2d');

class Tetris {
	constructor(c) {
		this.shape = null;
		this.drawnSquares = {};
		this.context = c;
		this.lastShapeTimer = null;
	}

	get shape() {
		return this._shape;
	}

	set shape(val) {
		this._shape = val;
	}

	get drawnSquares() {
		return this._drawnSquares;
	}

	set drawnSquares(val) {
		this._drawnSquares = val;
	}

	drawView() {
   		this.shape.draw();
		let self = this;
		_.forEach(self.drawnSquares, function(sameHeightSquares) {
			_.forEach(sameHeightSquares, function(val) {
				val.draw(val.topLeft[0], val.topLeft[1]);
			});
		});
	}

	clearView() {
		this.context.clearRect(0, 0, WIDTH, HEIGHT);
	}

	loop() {
		let randomType = Math.floor(Math.random()*1);
		switch(randomType) {
			case 0:
				let units0 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_1),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_1),
					new UnitSquare(this.drawnSquares, this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_1),
					new UnitSquare(this.drawnSquares, this.context, START_X + 3*BASE_PLUS_PADDING, START_Y, COLOR_1)
				];
				this.shape = new IShape(this.drawnSquares, 0, 2, units0);
				break;
			// case 1:
			// 	let units1 = [
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_2),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_2),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_2),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_2)
			// 	];
			// 	this.shape = new IShape(this.drawnSquares, 0, 4, units1);
			// 	break;
			// case 2:
			// 	let units2 = [
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_3),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_3),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_3),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_3)
			// 	];
			// 	this.shape = new SquareShape(this.drawnSquares, 1, 1, units2);
			// 	break;
			// case 3:
			// 	let units3 = [
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_4),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_4),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_4),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_4)
			// 	];
			// 	this.shape = new LeftLShape(this.drawnSquares, 0, 4, units3);
			// 	break;
			// case 4:
			// 	let units4 = [
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_5),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_5),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_5),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_5)
			// 	];
			// 	this.shape = new RightLShape(this.drawnSquares, 0, 4, units4);
			// 	break;
			// case 5:
			// 	let units5 = [
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_6),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_6),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_6),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_6)
			// 	];
			// 	this.shape = new LeftZShape(this.drawnSquares, 0, 2, units5);
			// 	break;
			// case 6:
			// 	let units6 = [
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_7),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_7),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_7),
			// 		new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_7)
			// 	];
			// 	this.shape = new RightZShape(this.drawnSquares, 0, 2, units6);
			// 	break;
		}

		let self = this;
		this.drawView();
		this.lastShapeTimer = setInterval(function() {
			let testResult = self.shape.testDown();
			if (testResult) {
				self.clearView();
				self.shape.moveShapeDown();
				self.drawView();
			} else {
				clearInterval(self.lastShapeTimer);
				self.clearView();
				self.loop();
			}
		}, 1000);
	}

	registerKeyDownOnDocument() {
		let self = this;
		$(document).keydown(function(event) {
			self.clearView();
			var keyCode = event.which;
			if(!self.shape.keyDownHandler(keyCode)) {
				clearInterval(self.lastShapeTimer);
				self.loop();
				return;
			}
			self.drawView();
			return true;
		});
	}
};

var tetris = new Tetris(context);
tetris.loop();
tetris.registerKeyDownOnDocument();