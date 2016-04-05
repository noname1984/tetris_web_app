'use strict';

class Shape {
	constructor(drawnSquares, state, numStates, unitArr) {
		this.state = state;
		this.numStates = numStates;
		this.unitArr = unitArr;
		this.drawnSquares = drawnSquares;
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
			let testLeftResult = this.testLeft();
			if (testLeftResult) {
				this.moveShapeLeft();
			}
			return true;
		} else if(keyCode == 38) {	// up arrow
			if(this.upArrowHandler()) {
				return true;
			} else {
				return false;
			}
		} else if (keyCode == 39) {	// right arrow
			let testRightResult = this.testRight();
			if (testRightResult) {
				this.moveShapeRight();
			}
			return true;
		} else if (keyCode == 40) {	// down arrow
			let testResult = this.testDown();
			if (testResult) {
				this.moveShapeDown();
				return true;
			} else {
				return false;
			}
		}
		console.log('x: ', this.x, ', y: ', this.y);
	}
	
	moveShapeLeft() {
		let self = this;
		_.forEach(self.unitArr, function(val) {
			val.moveLeft();
		});
	}

	moveShapeRight() {
		let self = this;
		_.forEach(self.unitArr, function(val) {
			val.moveRight();
		});
	}

	moveShapeDown() {
		let self = this;
		_.forEach(self.unitArr, function(val) {
			val.moveDown();
		});
	}

	testLeft() {
		let result = true;
		let self = this;
		_.forEach(self.unitArr, function(val) {
			if (!val.canSquareMoveLeft()) {
				result = false;
				return false;
			}
		});
		return result;
	}

	testRight() {
		let result = true;
		let self = this;
		_.forEach(self.unitArr, function(val) {
			if (!val.canSquareMoveRight()) {
				result = false;
				return false;
			}
		});
		return result;
	}

	testDown() {
		let result = true;
		let self = this;
		_.forEach(self.unitArr, function(val) {
			if (!val.canSquareMoveDown()) {
				result = false;
				return false;
			}
		});
		if (!result) {
			let self = this;
			_.forEach(self.unitArr, function(val) {
				val.insertToDrawnSquares();
			});
		}
		return result;
	}

	testRotate() {
		let result = true;
		let self = this;
		_.forEach(self.unitArr, function(val) {
			if (!val.testRotateSquare()) {
				result = false;
				return false;
			}
		});
		return result;
	}
}