'use strict';

class RightLShape extends Shape {
	constructor(context, x, y, state, numStates) {
		super(context, x, y, state, numStates);
	}

	drawDownBasic() {
		this.c.strokeStyle = COLOR_4;
		this.c.beginPath();
		this.c.moveTo(BASE_SIZE, 0);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.moveTo(2*BASE_SIZE, 0);
		this.c.lineTo(2*BASE_SIZE, BASE_SIZE);

		this.c.moveTo(0, 0);
		this.c.lineTo(0, BASE_SIZE);
		this.c.lineTo(3*BASE_SIZE, BASE_SIZE);
		this.c.lineTo(3*BASE_SIZE, 0);
		this.c.closePath();

		this.c.moveTo(0, BASE_SIZE);
		this.c.lineTo(0, 2*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.stroke();
	};

	drawLeftBasic() {
		this.c.strokeStyle = COLOR_4;
		this.c.beginPath();
		this.c.moveTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, BASE_SIZE);
		this.c.moveTo(BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);

		this.c.moveTo(BASE_SIZE, 0);
		this.c.lineTo(BASE_SIZE, 3*BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 3*BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 0);
		this.c.closePath();

		this.c.moveTo(BASE_SIZE, 0);
		this.c.lineTo(0, 0);
		this.c.lineTo(0, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.stroke();
	};

	drawUpBasic() {
		this.c.strokeStyle = COLOR_4;
		this.c.beginPath();
		this.c.moveTo(2*BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 0);
		this.c.lineTo(3*BASE_SIZE, 0);
		this.c.lineTo(3*BASE_SIZE, BASE_SIZE);

		this.c.moveTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE);
		this.c.moveTo(2*BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);

		this.c.moveTo(0, BASE_SIZE);
		this.c.lineTo(0, 2*BASE_SIZE);
		this.c.lineTo(3*BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(3*BASE_SIZE, BASE_SIZE);
		this.c.closePath();

		this.c.stroke();
	}

	drawRightBasic() {
		this.c.strokeStyle = COLOR_4;
		this.c.beginPath();
		this.c.beginPath();
		this.c.moveTo(0, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.moveTo(0, 2*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE);

		this.c.moveTo(0, 0);
		this.c.lineTo(0, 3*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 3*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 0);
		this.c.closePath();

		this.c.moveTo(BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 3*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 3*BASE_SIZE);

		this.c.stroke();
	}

	drawDown() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawDownBasic();
		this.c.restore();

		this.state = 0;
	}

	drawLeft() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawLeftBasic();
		this.c.restore();

		this.state = 1;
	}

	drawUp() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawUpBasic();
		this.c.restore();

		this.state = 2;
	}

	drawRight() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawRightBasic();
		this.c.restore();

		this.state = 3;
	}

	upArrowHandler(x, y) {
		if (this.state === 0) {
			this.y = y - BASE_SIZE;
			this.state = 1;
		} else if (this.state === 1) {
			this.state = 2;
		} else if (this.state === 2) {
			this.x = x + BASE_SIZE;
			this.state = 3;
		} else {
			this.x = x - BASE_SIZE;
			this.y = y + BASE_SIZE;
			this.state = 0;
		}
	}
}