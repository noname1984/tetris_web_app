'use strict';

class LeftZShape extends Shape {
	constructor(context, x, y, width, height, state, numStates) {
		super(context, x, y, width, height, state, numStates);
	}

	drawVerticalBasic() {
		super.drawUnit(0, BASE_SIZE + 4, COLOR_3);
		super.drawUnit(0, 2*(BASE_SIZE + 4), COLOR_3);
		super.drawUnit(BASE_SIZE + 4, 0, COLOR_3);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_3);
	}

	drawHorizontalBasic() {
		super.drawUnit(0, 0, COLOR_3);
		super.drawUnit(BASE_SIZE + 4, 0, COLOR_3);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_3);
		super.drawUnit(2*(BASE_SIZE + 4), BASE_SIZE + 4, COLOR_3);
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
			var newX = x + BASE_SIZE + PADDING;
			var newY = y - BASE_SIZE - PADDING;

			if (newX >= 0 && newX + this._h <= WIDTH && newY + this._w <= HEIGHT) {
				this.x = newX;
				this.y = newY;
				this.state = 1;
			}
		} else {
			var newX = x - BASE_SIZE - PADDING;
			var newY = y + BASE_SIZE + PADDING;

			if (newX >= 0 && newX + this._w <= WIDTH && newY + this._h <= HEIGHT) {
				this.x = newX;
				this.y = newY;
				this.state = 0;
			}
		}
	}
};