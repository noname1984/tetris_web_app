'use strict';

class IShape extends Shape {
	constructor(drawnSquares, state, numStates, unitArr) {
		super(drawnSquares, state, numStates, unitArr);
	}

	upArrowHandler() {
		if (this.state === 0) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] - 2*BASE_PLUS_PADDING);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1] - BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			
			let testResult = this.testRotate();
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] - 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] + 2*BASE_PLUS_PADDING);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] - BASE_PLUS_PADDING);
			} else {
				this.state = 1;
			}
		} else {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] - 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] + 2*BASE_PLUS_PADDING);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] - BASE_PLUS_PADDING);
			
			let testResult = this.testRotate();
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] - 2*BASE_PLUS_PADDING);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1] - BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			} else {
				this.state = 0;
			}
		}
	}
};