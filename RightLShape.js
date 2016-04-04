'use strict';

class RightLShape extends Shape {
	constructor(state, numStates, unitArr) {
		super(state, numStates, unitArr);
	}

	drawDown() {
		this.unitArr[0].draw(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
		this.unitArr[1].draw(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1]);
		this.unitArr[2].draw(this.unitArr[2].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[2].topLeft[1]);
		this.unitArr[3].draw(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);

		this.state = 0;
	}

	drawLeft() {
		this.unitArr[0].draw(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
		this.unitArr[1].draw(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1]);
		this.unitArr[2].draw(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + 2*BASE_PLUS_PADDING);

		this.state = 1;
	}

	drawUp() {
		this.unitArr[0].draw(this.unitArr[0].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1]);
		this.unitArr[1].draw(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.unitArr[3].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);

		this.state = 2;
	}

	drawRight() {
		this.unitArr[0].draw(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
		this.unitArr[1].draw(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1] + 2*BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + 2*BASE_PLUS_PADDING);

		this.state = 3;
	}

	upArrowHandler(x, y) {
		if (this.state === 0) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1]);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + 2*BASE_PLUS_PADDING);
			
			let testResult = Tetris.testRotate(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1]);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[2].topLeft[1]);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			}
			return testResult;
		} else if (this.state === 1) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1]);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			
			let testResult = Tetris.testRotate(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1]);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + 2*BASE_PLUS_PADDING);
			}
			return testResult;
		} else if (this.state === 2) {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1] + 2*BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + 2*BASE_PLUS_PADDING);
			
			let testResult = Tetris.testRotate(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[0].topLeft[1]);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			}
			return testResult;
		} else {
			this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
			this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[1].topLeft[1]);
			this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0] + 2*BASE_PLUS_PADDING, this.unitArr[2].topLeft[1]);
			this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0], this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
			
			let testResult = Tetris.testRotate(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
				this.unitArr[1].updateCoors(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.unitArr[2].topLeft[0], this.unitArr[2].topLeft[1] + 2*BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + 2*BASE_PLUS_PADDING);
			}
			return testResult;
		}
	}
}