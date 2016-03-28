'use strict';

class LeftZShape extends Shape {
	constructor(context, x, y, state, actionByState) {
		super(context, x, y, state, null);
		this.actionByState = {
			0: 'horizontal',
			1: 'vertical'
		};
	}

	drawVerticalBasic() {
		this.c.beginPath();
		this.c.moveTo(BASE_SIZE, 0);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		
		this.c.moveTo(0, 0);
		this.c.lineTo(0, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 0);
		this.c.closePath();

		this.c.moveTo(2*BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);
		
		this.c.moveTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(3*BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(3*BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, BASE_SIZE);
		this.c.stroke();
	}

	drawHorizontalBasic() {
		this.c.beginPath();
		this.c.moveTo(0, 2*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE);
		this.c.moveTo(0, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 3*BASE_SIZE);
		this.c.lineTo(0, 3*BASE_SIZE);
		this.c.closePath();

		this.c.moveTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(2*BASE_SIZE, BASE_SIZE);
		this.c.moveTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 0);
		this.c.lineTo(2*BASE_SIZE, 0);
		this.c.lineTo(2*BASE_SIZE, 2*BASE_SIZE);
		this.c.lineTo(BASE_SIZE, 2*BASE_SIZE)

		this.c.stroke();
	}

	vertical() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawVerticalBasic();
		this.c.restore();
		this.state = 1;
	}

	horizontal() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawHorizontalBasic();
		this.c.restore();
		this.state = 0;
	}

	upArrowHandler(x, y) {
		if (this.state === 0) {
			this.x = x + BASE_SIZE;
			this.y = y - BASE_SIZE;
			this.state = 1;
		} else {
			this.x = x - BASE_SIZE;
			this.y = y + BASE_SIZE;
			this.state = 0;
		}
	}
};