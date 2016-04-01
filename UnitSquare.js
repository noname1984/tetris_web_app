'use strict';

class UnitSquare {
	constructor(context, topLeft, topRight, bottomLeft, bottomRight, color) {
		this.topLeft = topLeft;
		this.topRight = topRight;
		this.bottomLeft = bottomLeft;
		this.bottomRight = bottomRight;
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