'use strict';

class TShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
	}

	drawDownBasic() {
		this.unitArr[0].draw(0, 0);
		this.unitArr[1].draw(BASE_SIZE + 4, 0);
		this.unitArr[2].draw(2*(BASE_SIZE + 4), 0);
		this.unitArr[3].draw(BASE_SIZE + 4, BASE_SIZE + 4);
	}

	drawLeftBasic() {
		this.unitArr[0].draw(0, BASE_SIZE + 4);
		this.unitArr[1].draw(BASE_SIZE + 4, 0);
		this.unitArr[2].draw(BASE_SIZE + 4, BASE_SIZE + 4);
		this.unitArr[3].draw(BASE_SIZE + 4, 2*(BASE_SIZE + 4));
	}

	drawUpBasic() {
		this.unitArr[0].draw(BASE_SIZE + 4, 0);
		this.unitArr[1].draw(0, BASE_SIZE + 4);
		this.unitArr[2].draw(BASE_SIZE + 4, BASE_SIZE + 4);
		this.unitArr[3].draw(2*(BASE_SIZE + 4), BASE_SIZE + 4);
	}

	drawRightBasic() {
		this.unitArr[0].draw(0, 0);
		this.unitArr[1].draw(0, BASE_SIZE + 4);
		this.unitArr[2].draw(0, 2*(BASE_SIZE + 4));
		this.unitArr[3].draw(BASE_SIZE + 4, BASE_SIZE + 4);
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

			if (newY + this.w <= HEIGHT) {
				this.y = newY;
				this.state = 1;
			}
		} else if (this.state === 1) {
			var newWidth = x + this.w;

			if(newWidth <= WIDTH) {
				this.state = 2;
			}
		} else if (this.state === 2) {
			var newX = x + BASE_SIZE + PADDING;
			var newHeight = y + this.w;

			if(newX >= 0 && newX + this.w <= WIDTH && newHeight <= HEIGHT) {
				this.x = newX;
				this.state = 3;
			}
		} else {
			var newX = x - BASE_SIZE - PADDING;
			var newY = y + BASE_SIZE + PADDING;

			if (newX >= 0 && newX + this.w <= WIDTH && newY + this.h <= HEIGHT) {
				this.x = newX;
				this.y = newY;
				this.state = 0;
			}
		}
	}
};