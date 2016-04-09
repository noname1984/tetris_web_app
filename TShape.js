'use strict';

class TShape extends Shape {
	constructor(drawnSquares, state, numStates, unitArr) {
		super(drawnSquares, state, numStates, unitArr);
	}

	upArrowHandler() {
		if(this.state === 0) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] - BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1]);
			
			let testResult = this.testRotate();
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1]);
			} else {
				this.state = 1;
			}
		} else if (this.state === 1) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] - BASE_PLUS_PADDING);
			
			let testResult = this.testRotate();
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			} else {
				this.state = 2;
			}
		} else if (this.state === 2) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1]);
			
			let testResult = this.testRotate();
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] - BASE_PLUS_PADDING);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1]);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1]);
			} else {
				this.state = 3;
			}
		} else {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] - BASE_PLUS_PADDING);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			
			let testResult = this.testRotate();
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[0].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1]);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] - BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] - BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] - BASE_PLUS_PADDING);
			} else {
				this.state = 0;
			}
		}
	}
};