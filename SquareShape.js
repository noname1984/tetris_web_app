'use strict';

class SquareShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
	}

	draw() {
		this.unitArr[0].draw(this.x, this.y);
		this.unitArr[1].draw(this.x, this.y + BASE_SIZE + PADDING);
		this.unitArr[2].draw(this.x + BASE_SIZE + PADDING, this.y);
		this.unitArr[3].draw(this.x + BASE_SIZE + PADDING, this.y + BASE_SIZE + PADDING);
	}

	upArrowHandler(x, y) {
		//not supporting this
	}
};