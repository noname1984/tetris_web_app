'use strict';

class UnitSquare {
	constructor(drawnSquares, context, topLeftX, topLeftY, color) {
		this.topLeft = [topLeftX, topLeftY];
		this.topRight = [topLeftX + BASE_SIZE, topLeftY];
		this.bottomLeft = [topLeftX, topLeftY + BASE_SIZE];
		this.bottomRight = [topLeftX + BASE_SIZE, topLeftY + BASE_SIZE];
		this.canvasContext = context;
		this.color = color;
		this.drawnSquares = drawnSquares;
	}

	updateCoors(x, y) {
		this.topLeft = [x, y];
		this.topRight = [x + BASE_SIZE, y];
		this.bottomLeft = [x, y + BASE_SIZE];
		this.bottomRight = [x + BASE_SIZE, y + BASE_SIZE];
	}

	moveLeft() {
		this.topLeft = [this.topLeft[0] - BASE_PLUS_PADDING, this.topLeft[1]];
		this.topRight = [this.topRight[0] - BASE_PLUS_PADDING, this.topRight[1]];
		this.bottomLeft = [this.bottomLeft[0] - BASE_PLUS_PADDING, this.bottomLeft[1]];
		this.bottomRight = [this.bottomRight[0] - BASE_PLUS_PADDING, this.bottomRight[1]];
	}

	canSquareMoveLeft() {
		let x = this.topLeft[0] - BASE_PLUS_PADDING;
		if (x < 0) {
			return false;
		} else {
			let y = this.topLeft[1];
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

	moveRight() {
		this.topLeft = [this.topLeft[0] + BASE_PLUS_PADDING, this.topLeft[1]];
		this.topRight = [this.topRight[0] + BASE_PLUS_PADDING, this.topRight[1]];
		this.bottomLeft = [this.bottomLeft[0] + BASE_PLUS_PADDING, this.bottomLeft[1]];
		this.bottomRight = [this.bottomRight[0] + BASE_PLUS_PADDING, this.bottomRight[1]];
	}

	canSquareMoveRight() {
		let x = this.topLeft[0] + BASE_PLUS_PADDING;
		if (x > WIDTH) {
			return false;
		} else {
			let y = this.topLeft[1];
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

	moveDown() {
		this.topLeft = [this.topLeft[0], this.topLeft[1] + BASE_PLUS_PADDING];
		this.topRight = [this.topRight[0], this.topRight[1] + BASE_PLUS_PADDING];
		this.bottomLeft = [this.bottomLeft[0], this.bottomLeft[1] + BASE_PLUS_PADDING];
		this.bottomRight = [this.bottomRight[0], this.bottomRight[1] + BASE_PLUS_PADDING];
	}

	canSquareMoveDown() {
		let y = this.topLeft[1];
		let y1 = y + BASE_PLUS_PADDING;
		let x = this.topLeft[0];
		if (y1 > HEIGHT) {
			return false;
		} else {
			if (!this.drawnSquares[y1]) {
				return true;
			} else {
				if (!this.drawnSquares[y1][x]) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

	testRotateSquare() {
		let x = this.topLeft[0];
		let y = this.topLeft[1];
		if (x < 0 || x > WIDTH || y > HEIGHT) {
			return false;
		}

		if (this.drawnSquares[y] && this.drawnSquares[y][x]) {
			return false;
		} else {
			return true;
		}
	}

	draw() {
		this.canvasContext.save();
		this.canvasContext.strokeStyle = this.color;
		this.canvasContext.translate(this.topLeft[0], this.topLeft[1]);
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(0, 0);
		this.canvasContext.lineTo(BASE_SIZE, 0);
		this.canvasContext.lineTo(BASE_SIZE, BASE_SIZE);
		this.canvasContext.lineTo(0, BASE_SIZE);
		this.canvasContext.closePath();
		this.canvasContext.stroke();
		this.canvasContext.restore();
	}

	insertToDrawnSquares() {
		let x = this.topLeft[0];
		let y = this.topLeft[1];
		if (!this.drawnSquares[y]) {
			this.drawnSquares[y] = {};
			this.drawnSquares[y][x] = this;
		} else {
			this.drawnSquares[y][x] = this;
		}
	}
	
	isSquareHidden() {
		let y = this.topLeft[1];
		return (y === START_Y) ? true : false;
	}
}