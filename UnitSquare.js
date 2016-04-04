'use strict';

class UnitSquare {
	constructor(context, topLeftX, topLeftY, color) {
		this.topLeft = [topLeftX, topLeftY];
		this.topRight = [topLeftX + BASE_SIZE, topLeftY];
		this.bottomLeft = [topLeftX, topLeftY + BASE_SIZE];
		this.bottomRight = [topLeftX + BASE_SIZE, topLeftY + BASE_SIZE];
		this.canvasContext = context;
		this.color = color;
	}

	get topLeft() {
		return this._topLeft;
	}

	set topLeft(val) {
		this._topLeft = val;
	}

	get topRight() {
		return this._topRight;
	}

	set topRight(val) {
		this._topRight = val;
	}

	get bottomLeft() {
		return this._bottomLeft;
	}

	set bottomLeft(val) {
		this._bottomLeft = val;
	}

	get bottomRight() {
		return this._bottomRight;
	}

	set bottomRight(val) {
		this._bottomRight = val;
	}

	get color() {
		return this._color;
	}

	set color(val) {
		this._color = val;
	}

	updateCoors(x, y) {
		this._topLeft = [x, y];
		this._topRight = [x + BASE_SIZE, y];
		this._bottomLeft = [x, y + BASE_SIZE];
		this._bottomRight = [x + BASE_SIZE, y + BASE_SIZE];
	}

	moveLeft() {
		this._topLeft = [this.topLeft[0] - BASE_PLUS_PADDING, this.topLeft[1]];
		this._topRight = [this.topRight[0] - BASE_PLUS_PADDING, this.topRight[1]];
		this._bottomLeft = [this.bottomLeft[0] - BASE_PLUS_PADDING, this.bottomLeft[1]];
		this._bottomRight = [this.bottomRight[0] - BASE_PLUS_PADDING, this.bottomRight[1]];
	}

	moveRight() {
		this._topLeft = [this.topLeft[0] + BASE_PLUS_PADDING, this.topLeft[1]];
		this._topRight = [this.topRight[0] + BASE_PLUS_PADDING, this.topRight[1]];
		this._bottomLeft = [this.bottomLeft[0] + BASE_PLUS_PADDING, this.bottomLeft[1]];
		this._bottomRight = [this.bottomRight[0] + BASE_PLUS_PADDING, this.bottomRight[1]];
	}

	moveDown() {
		this._topLeft = [this.topLeft[0], this.topLeft[1] + BASE_PLUS_PADDING];
		this._topRight = [this.topRight[0], this.topRight[1] + BASE_PLUS_PADDING];
		this._bottomLeft = [this.bottomLeft[0], this.bottomLeft[1] + BASE_PLUS_PADDING];
		this._bottomRight = [this.bottomRight[0], this.bottomRight[1] + BASE_PLUS_PADDING];
	}

	draw(x, y) {
		this.canvasContext.save();
		this.canvasContext.strokeStyle = this.color;
		this.canvasContext.translate(x, y);
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(0, 0);
		this.canvasContext.lineTo(BASE_SIZE, 0);
		this.canvasContext.lineTo(BASE_SIZE, BASE_SIZE);
		this.canvasContext.lineTo(0, BASE_SIZE);
		this.canvasContext.closePath();
		this.canvasContext.stroke();
		this.canvasContext.restore();

		this.updateCoors(x, y);
	}
}