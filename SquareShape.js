'use strict';

class SquareShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
	}

	drawBasic() {
		this.unitArr[0].draw(0, 0, this.x, this.y);
		this.unitArr[1].draw(0, BASE_SIZE + PADDING, this.x, this.y);
		this.unitArr[2].draw(BASE_SIZE + PADDING, 0, this.x, this.y);
		this.unitArr[3].draw(BASE_SIZE + PADDING, BASE_SIZE + PADDING, this.x, this.y);
	}

	draw() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawBasic();
		this.c.restore();
	}

	upArrowHandler(x, y) {
		//not supporting this
	}
};