'use strict';
var canvas = $('#tetrisBoard')[0];
var context = canvas.getContext('2d');
var scoreElement = $('#scoreValue');
var levelElement = $('#levelValue');
var pauseResumeButton = $('#pauseResume');
var newGameButton = $('#newGame');

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
	
	drawGameOver() {
		this.context.strokeStyle = COLOR_8;
		this.context.beginPath();

		let x = MIN_X;
		let y = MAX_Y + PADDING
		while(x < WIDTH) {
			this.context.moveTo(x, START_Y);
			this.context.lineTo(x, y);
			x = x + BASE_PLUS_PADDING;
		}

		x = WIDTH - 2;
		y = START_Y;
		while(y < HEIGHT) {
			this.context.moveTo(MIN_X, y);
			this.context.lineTo(x, y);
			y = y + BASE_PLUS_PADDING;
		}
		this.context.closePath();
		this.context.stroke();
	}

	clearView() {
		this.context.clearRect(0, 0, WIDTH, HEIGHT);
	}

	loop() {
		let randomType = Math.floor(Math.random()*7);
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
			case 1:
				let units1 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_2),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_2),
					new UnitSquare(this.drawnSquares, this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_2),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_2)
				];
				this.shape = new TShape(this.drawnSquares, 0, 4, units1);
				break;
			case 2:
				let units2 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_3),
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y + BASE_PLUS_PADDING, COLOR_3),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_3),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_3)
				];
				this.shape = new SquareShape(this.drawnSquares, 1, 1, units2);
				break;
			case 3:
				let units3 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_4),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_4),
					new UnitSquare(this.drawnSquares, this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_4),
					new UnitSquare(this.drawnSquares, this.context, START_X + 2*BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_4)
				];
				this.shape = new LeftLShape(this.drawnSquares, 0, 4, units3);
				break;
			case 4:
				let units4 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_5),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_5),
					new UnitSquare(this.drawnSquares, this.context, START_X + 2*BASE_PLUS_PADDING, START_Y, COLOR_5),
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y + BASE_PLUS_PADDING, COLOR_5)
				];
				this.shape = new RightLShape(this.drawnSquares, 0, 4, units4);
				break;
			case 5:
				let units5 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_6),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_6),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_6),
					new UnitSquare(this.drawnSquares, this.context, START_X + 2*BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_6)
				];
				this.shape = new LeftZShape(this.drawnSquares, 0, 2, units5);
				break;
			case 6:
				let units6 = [
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y, COLOR_7),
					new UnitSquare(this.drawnSquares, this.context, START_X + BASE_PLUS_PADDING, START_Y, COLOR_7),
					new UnitSquare(this.drawnSquares, this.context, START_X - BASE_PLUS_PADDING, START_Y + BASE_PLUS_PADDING, COLOR_7),
					new UnitSquare(this.drawnSquares, this.context, START_X, START_Y + BASE_PLUS_PADDING, COLOR_7)
				];
				this.shape = new RightZShape(this.drawnSquares, 0, 2, units6);
				break;
		}

		this.drawView();
		this.lastShapeTimer = setInterval(this.timer(), 1000);
	}

	timer() {
		let self = this;
		return function() {
			self.clearView();
			var keyCode = 40;
			let keyDownHandlerResult = self.shape.keyDownHandler(keyCode);
			if(keyDownHandlerResult.result === 'false') {
				self.drawnSquares = keyDownHandlerResult.drawnSquares;
				clearInterval(self.lastShapeTimer);
				self.loop();
				return;
			} else if (keyDownHandlerResult.result === 'game-over') {
				self.drawGameOver();
				clearInterval(self.lastShapeTimer);
				return;
			}
			self.drawView();
			return true;
		};
	}

	registerKeyDownOnDocument() {
		let self = this;
		$(document).keydown(function(event) {
			var keyCode = event.which;
			let allowedKeys = [37, 38, 39, 40];
			if (allowedKeys.indexOf(keyCode) < 0) {
				event.preventDefault();
				return;
			}
			self.clearView();
			let keyDownHandlerResult = self.shape.keyDownHandler(keyCode);
			if(keyDownHandlerResult.result === 'false') {
				self.drawnSquares = keyDownHandlerResult.drawnSquares;
				clearInterval(self.lastShapeTimer);
				self.loop();
				return;
			} else if (keyDownHandlerResult.result === 'game-over') {
				self.drawGameOver();
				clearInterval(self.lastShapeTimer);
				return;
			}
			self.drawView();
			return true;
		});
	}

	newGameButtonClickHandler() {
		let self = this;
		newGameButton.on('click', function() {
			clearInterval(self.lastShapeTimer);
			self.lastShapeTimer = 0;
			self.clearView();
			self.loop();
			scoreElement.html('0');
			levelElement.html('1');
		});
	}

	pauseResumeButtonClickHandler() {
		let self = this;
		pauseResumeButton.on('click', function() {
			let text = pauseResumeButton.html();
			if (text == 'Pause') {
				clearInterval(self.lastShapeTimer);
				pauseResumeButton.html('Resume');
			} else if (text == 'Resume') {
				self.lastShapeTimer = 0;
				self.lastShapeTimer = setInterval(self.timer(), 1000);
				pauseResumeButton.html('Pause');
			}
		});
	}
};

var tetris = new Tetris(context);
tetris.loop();
tetris.registerKeyDownOnDocument();
tetris.newGameButtonClickHandler();
tetris.pauseResumeButtonClickHandler();