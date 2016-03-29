'use strict';

class TShape extends Shape {
	constructor(context, x, y, width, height, state, numStates) {
		super(context, x, y, width, height, state, numStates);
	}

	drawDownBasic() {
		super.drawUnit(0, 0, COLOR_7);
		super.drawUnit(BASE_SIZE + 4, 0, COLOR_7);
		super.drawUnit(2*(BASE_SIZE + 4), 0, COLOR_7);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_7);
	}

	drawLeftBasic() {
		super.drawUnit(0, BASE_SIZE + 4, COLOR_7);
		super.drawUnit(BASE_SIZE + 4, 0, COLOR_7);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_7);
		super.drawUnit(BASE_SIZE + 4, 2*(BASE_SIZE + 4), COLOR_7);
	}

	drawUpBasic() {
		super.drawUnit(BASE_SIZE + 4, 0, COLOR_7);
		super.drawUnit(0, BASE_SIZE + 4, COLOR_7);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_7);
		super.drawUnit(2*(BASE_SIZE + 4), BASE_SIZE + 4, COLOR_7);
	}

	drawRightBasic() {
		super.drawUnit(0, 0, COLOR_7);
		super.drawUnit(0, BASE_SIZE + 4, COLOR_7);
		super.drawUnit(0, 2*(BASE_SIZE + 4), COLOR_7);
		super.drawUnit(BASE_SIZE + 4, BASE_SIZE + 4, COLOR_7);
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
		if(this.state === 0) {
			var newY = y - BASE_SIZE - PADDING;

			if (newY + this._w <= HEIGHT) {
				this.y = newY;
				this.state = 1;
			}
		} else if (this.state === 1) {
			var newWidth = x + this._w;

			if(newWidth <= WIDTH) {
				this.state = 2;
			}
		} else if (this.state === 2) {
			var newX = x + BASE_SIZE + PADDING;
			var newHeight = y + this._w;

			if(newX >= 0 && newX + this._w <= WIDTH && newHeight <= HEIGHT) {
				this.x = newX;
				this.state = 3;
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