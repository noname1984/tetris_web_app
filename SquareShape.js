'use strict';

class SquareShape extends Shape {
	constructor(context, x, y, state, numStates) {
		super(context, x, y, state, numStates);
	}

	drawBasic() {
		this.c.strokeStyle = COLOR_6;
		this.c.beginPath();
		this.c.moveTo(0, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, BASE_SIZE);

		this.c.moveTo(BASE_SIZE, 0);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE);

		this.c.moveTo(0, 0);
		this.c.lineTo(0, 2*BASE_SIZE);

		this.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 0);
		this.c.closePath();
		this.c.stroke();
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