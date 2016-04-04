'use strict';

class Shape {
	constructor(state, numStates, unitArr) {
		this.state = state;
		this.numStates = numStates;
		this.unitArr = unitArr;
	}

	get state() {
		return this._state;
	}

	set state(val) {
		this._state = val;
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

		if (keyCode == 37) {	// left arrow
			let testLeftResult = Tetris.testLeft(this);
			if (testLeftResult) {
				this.moveLeft();
			}
			return true;
		} else if(keyCode == 38) {	// up arrow
			if(this.upArrowHandler(x, y)) {
				return true;
			} else {
				return false;
			}
		} else if (keyCode == 39) {	// right arrow
			let testRightResult = Tetris.testRight(this);
			if (testRightResult) {
				this.moveRight();
			}
			return true;
		} else if (keyCode == 40) {	// down arrow
			let testResult = Tetris.testDown(this);
			if (testResult) {
				this.moveDown();
				return true;
			} else {
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

	moveLeft() {
		for (var i = 0; i < this.unitArr.length; i++) {
			this.unitArr[i].moveLeft();
		}
	}

	moveRight() {
		for (var i = 0; i < this.unitArr.length; i++) {
			this.unitArr[i].moveRight();
		}
	}

	moveDown() {
		for (var i = 0; i < this.unitArr.length; i++) {
			this.unitArr[i].moveDown();
		}
	}
}