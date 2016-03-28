'use strict';

class Shape {
	constructor(context, x, y, state, numStates) {
		this.c = context;
		this.x = x;
		this.y = y;
		this.state = state;
		this.numStates = numStates;
	}

	get x() {
		return this._x;
	}

	set x(xVal) {
		this._x = xVal;
	}

	get y() {
		return this._y;
	}

	set y(yVal) {
		this._y = yVal;
	}

	get state() {
		return this._state;
	}

	set state(stateVal) {
		this._state = stateVal;
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
			this.x = x - BASE_SIZE;
		} else if(keyCode == 38) {	// up arrow
			this.upArrowHandler(x, y);
		} else if (keyCode == 39) {	// right arrow
			this.x = x + BASE_SIZE;
		} else if (keyCode == 40) {	// down arrow
			this.y = y + BASE_SIZE;
		}
	}
}