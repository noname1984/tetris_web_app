'use strict';

class Shape {
	constructor(context, x, y, width, height, state, numStates) {
		this.c = context;
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		this.state = state;
		this.numStates = numStates;
	}

	get x() {
		return this._x;
	}

	set x(val) {
		this._x = val;
	}

	get y() {
		return this._y;
	}

	set y(val) {
		this._y = val;
	}

	get state() {
		return this._state;
	}

	set state(val) {
		this._state = val;
	}

	get w() {
		return this._w;
	}

	set w(val) {
		this._w = val;
	}

	get h() {
		return this._h;
	}

	set h(val) {
		this._h = val;
	}

	drawUnit(x, y, color) {
		this.c.save();
		this.c.strokeStyle = color;
		this.c.translate(x, y);
		this.c.beginPath();
		this.c.moveTo(0, 0);
		this.c.lineTo(BASE_SIZE, 0);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(0, BASE_SIZE);
		this.c.closePath();
		this.c.stroke();
		this.c.restore();
	}

	draw() {
		if (this.numStates == 4) {
			switch(this.state) {
				case 0:
					this.drawDown();
					break;
				case 1:
					this.drawLeft();
					break;
				case 2:
					this.drawUp();
					break;
				case 3:
					this.drawRight();
					break;
			}
		} else if (this.numStates == 2) {
			switch(this.state) {
				case 0:
					this.horizontal();
					break;
				case 1:
					this.vertical();
					break;
			}
		}
	}

	upArrowHandler() {
		console.log('need to overwrite this method');
	}

	keyDownHandler(keyCode) {
		var x = this.x;
		var y = this.y;

		if (keyCode == 37) {	// left arrow
			var newX = x - BASE_SIZE - PADDING;
			if (newX >= 0) {
				this.x = newX;
			}
		} else if(keyCode == 38) {	// up arrow
			this.upArrowHandler(x, y);
		} else if (keyCode == 39) {	// right arrow
			var newX = x + BASE_SIZE + PADDING;
			var newWidth = (this.state%2 == 0) ? (newX + this._w) : (newX + this._h);

			if (newWidth <= WIDTH) {
				this.x = newX;
			}
		} else if (keyCode == 40) {	// down arrow
			var newY = y + BASE_SIZE + PADDING;
			var newHeight = (this.state%2 == 0) ? (newY + this._h) : (newY + this._w);

			if (newHeight <= HEIGHT) {
				this.y = newY;
			}
		}
		console.log('x: ', this.x, ', y: ', this.y);
	}
}