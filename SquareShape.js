'use strict';

class SquareShape extends Shape {
	constructor(state, numStates, unitArr) {
		super(state, numStates, unitArr);
	}

	draw() {
		this.unitArr[0].draw(this.unitArr[0].topLeft[0], this.unitArr[0].topLeft[1]);
		this.unitArr[1].draw(this.unitArr[1].topLeft[0], this.unitArr[1].topLeft[1] + BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.unitArr[2].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[2].topLeft[1]);
		this.unitArr[3].draw(this.unitArr[3].topLeft[0] + BASE_PLUS_PADDING, this.unitArr[3].topLeft[1] + BASE_PLUS_PADDING);
	}

	upArrowHandler(x, y) {
		//not supporting this
	}
};