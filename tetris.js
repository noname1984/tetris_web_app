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
		_.forEach(this.drawnSquares, function(sameHeightSquares) {
			_.forEach(sameHeightSquares, function(val) {
				val.draw();
			});
		});
	}

	clearView() {
		this.context.clearRect(0, 0, WIDTH, HEIGHT);
	}

	loop() {
		let randomType = Math.floor(Math.random()*7);
		switch(randomType) {
			case 0:
				let units0 = [
					new UnitSquare(this.context, START_X, START_Y, COLOR_1),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_1),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_1),
					new UnitSquare(this.context, START_X + 3*BASE_PLUS_PADDING, START_Y, COLOR_1)
				];
				this.shape = new IShape(0, 2, units0);
				break;
			case 1:
				let units1 = [
					new UnitSquare(this.context, START_X, START_Y, COLOR_2),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_2),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_2),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_2)
				];
				this.shape = new TShape(0, 4, units1);
				break;
			case 2:
				let units2 = [
					new UnitSquare(this.context, START_X, START_Y, COLOR_3),
					new UnitSquare(this.context, START_X, START_Y + BASE_PLUS_PADDING, COLOR_3),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_3),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_3)
				];
				this.shape = new SquareShape(1, 1, units2);
				break;
			case 3:
				let units3 = [
					new UnitSquare(this.context, START_X, START_Y, COLOR_4),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_4),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_4),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_4)
				];
				this.shape = new LeftLShape(0, 4, units3);
				break;
			case 4:
				let units4 = [
					new UnitSquare(this.context, START_X, START_Y, COLOR_5),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_5),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_5),
					new UnitSquare(this.context, START_X, START_Y + BASE_PLUS_PADDING, COLOR_5)
				];
				this.shape = new RightLShape(0, 4, units4);
				break;
			case 5:
				let units5 = [
					new UnitSquare(this.context, START_X, START_Y, COLOR_6),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_6),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_6),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_6)
				];
				this.shape = new LeftZShape(0, 2, units5);
				break;
			case 6:
				let units6 = [
					new UnitSquare(this.context, START_X, START_Y + BASE_PLUS_PADDING, COLOR_7),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_7),
					new UnitSquare(this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_7),
					new UnitSquare(this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_7)
				];
				this.shape = new RightZShape(0, 2, units6);
				break;
		}

		var self = this;
		$(document).keydown(function(event) {
			self.clearView();
			var keyCode = event.which;
			if(!self.shape.keyDownHandler(keyCode)) {
				clearInterval(self.lastShapeTimer);
				self.loop();
				return;
			}
			self.drawView();
		});

		this.drawView();
		this.lastShapeTimer = setInterval(function() {
			let testResult = Tetris.testDown(self.shape);
			if (testResult) {
				self.clearView();
				self.shape.moveDown();
				self.drawView();
			} else {
				clearInterval(self.lastShapeTimer);
				self.clearView();
				self.loop();
			}
		}, 1000);
	}

	static testLeft(shape) {
		let result = true;
		_.forEach(shape.unitArr, function(val) {
			if (!Tetris.moveSquareLeft(val)) {
				result = false;
				return false;
			}
		});
		return result;
	}

	static moveSquareLeft(square) {
		let x = square.topLeft[0] - BASE_PLUS_PADDING;
		if (x < 0) {
			return false;
		} else {
			let y = square.topLeft[1];
			if (!this.drawnSquares[y]) {
				return true;
			} else {
				if (!this.drawnSquares[y][x]) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

	static testRight(shape) {
		let result = true;
		_.forEach(shape.unitArr, function(val) {
			if (!Tetris.moveSquareRight(val)) {
				result = false;
				return false;
			}
		});
		return result;
	}

	static moveSquareRight(square) {
		let x = square.topRight[0] + BASE_PLUS_PADDING;
		if (x > WIDTH) {
			return false;
		} else {
			let y = square.topRight[1];
			if (!this.drawnSquares[y]) {
				return true;
			} else {
				if (!this.drawnSquares[y][x]) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

	static testDown(shape) {
		let result = true;
		_.forEach(shape.unitArr, function(val) {
			if (!Tetris.moveSquareDown(val)) {
				result = false;
				return false;
			}
		});
		return result;
	}

	static moveSquareDown(square) {
		let y = square.topLeft[1];
		let y1 = y + BASE_PLUS_PADDING;
		let x = square.topLeft[0];
		if (y1 > HEIGHT) {
			if (!this.drawnSquares[y]) {
				this.drawnSquares[y] = {
					x: square
				};
			} else {
				this.drawnSquares[y][x] = square;
			}
			return false;
		} else {
			if (!this.drawnSquares[y1]) {
				return true;
			} else {
				if (!this.drawnSquares[y1][x]) {
					return true;
				} else {
					this.drawnSquares[y1][x] = square;
					return false;
				}
			}
		}
	}

	static testRotate(rotatedShape) {
		let result = true;
		_.forEach(rotatedShape.unitArr, function(val) {
			if (!Tetris.testRotateSquare(val)) {
				result = false;
				return false;
			}
		});
		return result;
	}

	static testRotateSquare(rotatedSquare) {
		let x = rotatedSquare.topLeft[0];
		let y = rotatedSquare.topLeft[1];
		if (x < 0 || x > WIDTH || y > HEIGHT) {
			return false;
		}

		if (this.drawnSquares[y] && this.drawnSquares[y][x]) {
			return false;
		} else {
			return true;
		}
	}
};

var tetris = new Tetris(context);
tetris.loop();