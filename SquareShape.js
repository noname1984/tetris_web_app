'use strict';

class SquareShape extends Shape {
	constructor(context, x, y, width, height, state, numStates) {
		super(context, x, y, width, height, state, numStates);
	}

	drawBasic() {
		super.drawUnit(0, 0, COLOR_6);
		super.drawUnit(0, BASE_SIZE + 4, COLOR_6);
		super.drawUnit(BASE_SIZE + 4, 0, COLOR_6);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_6);
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