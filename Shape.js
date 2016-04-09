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
		this.unitArr[0].draw();
		this.unitArr[1].draw();
		this.unitArr[2].draw();
		this.unitArr[3].draw();
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
			return {drawnSquares: this.drawnSquares, result: 'true'};
		} else if(keyCode == 38) {	// up arrow
			this.upArrowHandler();
			return {drawnSquares: this.drawnSquares, result: 'true'};
		} else if (keyCode == 39) {	// right arrow
			let testRightResult = this.testRight();
			if (testRightResult) {
				this.moveShapeRight();
			}
			return {drawnSquares: this.drawnSquares, result: 'true'};
		} else if (keyCode == 40) {	// down arrow
			let testResult = this.testDown();
			if (testResult === 'true') {
				this.moveShapeDown();
				return {drawnSquares: this.drawnSquares, result: 'true'};
			} else if (testResult === 'false') {
				let self = this;
				let lowestY = 0;
				let currentScore = parseInt(scoreElement.html());
				let currentLevel = parseInt(levelElement.html());
				_.forEach(this.unitArr, function (val) {
					let y = val.topLeft[1];
					if (lowestY < y) {
						lowestY = y;
					}
					if (self.drawnSquares[y]) {
						if (_.size(self.drawnSquares[y]) == 10) {
							delete self.drawnSquares[y];
							currentScore++;
						}
					}
				});

				scoreElement.html(currentScore);
				if(parseInt(currentScore / 30) + 1 > currentLevel) {
					levelElement.html(parseInt(currentScore/30) + 1);
				}

				let heights = _.keys(this.drawnSquares);
				_.sortBy(heights);
				let length = heights.length;
				let currentExpectedY = MAX_Y;
				let newDrawnSquares = {};
				for(var i = length - 1; i >= 0; i--) {
					let currentHeight = heights[i];
					let rowSquares = this.drawnSquares[currentHeight];
					if (currentHeight != currentExpectedY) {
						_.forEach(rowSquares, function(val) {
							val.topLeft[1] = currentExpectedY;
							val.topRight[1] = currentExpectedY;
							val.bottomLeft[1] = currentExpectedY + PADDING;
							val.bottomRight[1] = currentExpectedY + PADDING;
						});
						delete this.drawnSquares[currentHeight];
					}
					newDrawnSquares[currentExpectedY] = rowSquares;
					currentExpectedY = currentExpectedY - BASE_PLUS_PADDING;
				}
				this.drawnSquares = newDrawnSquares;
				return {drawnSquares: this.drawnSquares, result: 'false'};
			} else if (testResult === 'game-over') {
				return {drawnSquares: this.drawnSquares, result: 'game-over'};
			}
		}
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
		let result = 'true';
		let self = this;
		_.forEach(self.unitArr, function(val) {
			if (!val.canSquareMoveDown()) {
				result = 'false';
				return false;
			}
		});
		if (result === 'false') {
			_.forEach(self.unitArr, function (val) {
				if (val.isSquareHidden()) {
					result = 'game-over';
				}
			});

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