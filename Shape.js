'use strict';

class Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		this.c = context;
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		this.state = state;
		this.numStates = numStates;
		this.unitArr = unitArr;
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

	get unitArr() {
		return this._unitArr;
	}

	set unitArr(val) {
		this._unitArr = val;
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
			return true;
		} else if(keyCode == 38) {	// up arrow
			if(this.upArrowHandler(x, y)) {
				return true;
			} else {
				return false;
			}
		} else if (keyCode == 39) {	// right arrow
			var newX = x + BASE_SIZE + PADDING;
			var newWidth = (this.state%2 == 0) ? (newX + this.w) : (newX + this.h);

			if (newWidth <= WIDTH) {
				this.x = newX;
			}
			return true;
		} else if (keyCode == 40) {	// down arrow
			var newY = y + BASE_SIZE + PADDING;
			var newHeight = (this.state%2 == 0) ? (newY + this.h) : (newY + this.w);

			let testResult = testMove(this);
			if (!testResult) {
				for(var i = 0; i < this.unitArr.length; i++) {
					addToDrawnList(this.unitArr[i]);
				}
				return false;
			}

			if (newHeight <= HEIGHT) {
				this.y = newY;
				return true;
			} else {
				for(var i = 0; i < this.unitArr.length; i++) {
					addToDrawnList(this.unitArr[i]);
				}
				return false;
			}
		}
		console.log('x: ', this.x, ', y: ', this.y);
	}


	addShapeSquaresToDrawnList() {
		for(var i = 0; i < this.unitArr.length; i++) {
			addToDrawnList(this.unitArr[i]);
		}
	}
}