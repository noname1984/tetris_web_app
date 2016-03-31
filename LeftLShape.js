'use strict';

class LeftLShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
	}

	drawDownBasic() {
		this.unitArr[0].draw(0, 0, this.x, this.y);
		this.unitArr[1].draw(BASE_SIZE + PADDING, 0, this.x, this.y);
		this.unitArr[2].draw(2*(BASE_SIZE + PADDING), 0, this.x, this.y);
		this.unitArr[3].draw(2*(BASE_SIZE + PADDING), BASE_SIZE + PADDING, this.x, this.y);
	};

	drawLeftBasic() {
		this.unitArr[0].draw(BASE_SIZE + PADDING, 0, this.x, this.y);
		this.unitArr[1].draw(BASE_SIZE + PADDING, BASE_SIZE + PADDING, this.x, this.y);
		this.unitArr[2].draw(BASE_SIZE + PADDING, 2*(BASE_SIZE + PADDING), this.x, this.y);
		this.unitArr[3].draw(0, 2*(BASE_SIZE + PADDING), this.x, this.y);
	};

	drawUpBasic() {
		this.unitArr[0].draw(0, 0, this.x, this.y);
		this.unitArr[1].draw(0, BASE_SIZE + PADDING, this.x, this.y);
		this.unitArr[2].draw(BASE_SIZE + PADDING, BASE_SIZE + PADDING, this.x, this.y);
		this.unitArr[3].draw(2*(BASE_SIZE + PADDING), BASE_SIZE + PADDING, this.x, this.y);
	}

	drawRightBasic() {
		this.unitArr[0].draw(0, 0, this.x, this.y);
		this.unitArr[1].draw(0, BASE_SIZE + PADDING, this.x, this.y);
		this.unitArr[2].draw(0, 2*(BASE_SIZE + PADDING), this.x, this.y);
		this.unitArr[3].draw(BASE_SIZE + PADDING, 0, this.x, this.y);
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
			var newY = y - BASE_SIZE - PADDING;
			this.unitArr[0].updateCoors(BASE_SIZE + PADDING + this.x, this.y);
			this.unitArr[1].updateCoors(BASE_SIZE + PADDING + this.x, BASE_SIZE + PADDING + this.y);
			this.unitArr[2].updateCoors(BASE_SIZE + PADDING + this.x, 2*(BASE_SIZE + PADDING) + this.y);
			this.unitArr[3].updateCoors(this.x, 2*(BASE_SIZE + PADDING) + this.y);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(BASE_SIZE + PADDING + this.x, this.y);
				this.unitArr[2].updateCoors(this.x + 2*(BASE_SIZE + PADDING), this.y);
				this.unitArr[3].updateCoors(this.x + 2*(BASE_SIZE + PADDING), BASE_SIZE + PADDING + this.y);
				
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}

			if (newY + this._w <= HEIGHT) {
				this.y = newY;
				this.state = 1;
				return true;
			} else {
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}
		} else if (this.state === 1) {
			var newWidth = x + this.w;
			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x, BASE_SIZE + PADDING + this.y);
			this.unitArr[2].updateCoors(BASE_SIZE + PADDING + this.x, BASE_SIZE + PADDING + this.y);
			this.unitArr[3].updateCoors(2*(BASE_SIZE + PADDING) + this.x, BASE_SIZE + PADDING + this.y);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(BASE_SIZE + PADDING + this.x, this.y);
				this.unitArr[1].updateCoors(BASE_SIZE + PADDING + this.x, BASE_SIZE + PADDING + this.y);
				this.unitArr[2].updateCoors(BASE_SIZE + PADDING + this.x, 2*(BASE_SIZE + PADDING) + this.y);
				this.unitArr[3].updateCoors(this.x, 2*(BASE_SIZE + PADDING) + this.y);

				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}

			if (newWidth <= WIDTH) {
				this.state = 2;
				return true;
			} else {
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}
		} else if (this.state === 2) {
			var newX = x + BASE_SIZE + PADDING;
			var newHeight = y + this.w;

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x, BASE_SIZE + PADDING + this.y);
			this.unitArr[2].updateCoors(this.x, 2*(BASE_SIZE + PADDING) + this.y);
			this.unitArr[3].updateCoors(BASE_SIZE + PADDING + this.x, this.y);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x, BASE_SIZE + PADDING + this.y);
				this.unitArr[2].updateCoors(BASE_SIZE + PADDING + this.x, BASE_SIZE + PADDING + this.y);
				this.unitArr[3].updateCoors(2*(BASE_SIZE + PADDING) + this.x, BASE_SIZE + PADDING + this.y);
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}

			if(newX >= 0 && newX + this.h <= WIDTH && newHeight <= HEIGHT) {
				this.x = newX;
				this.state = 3;
				return true;
			} else {
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}
		} else {
			var newX = x - BASE_SIZE - PADDING;
			var newY = y + BASE_SIZE + PADDING;

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(BASE_SIZE + PADDING + this.x, this.y);
			this.unitArr[2].updateCoors(this.x + 2*(BASE_SIZE + PADDING), this.y);
			this.unitArr[3].updateCoors(this.x + 2*(BASE_SIZE + PADDING), BASE_SIZE + PADDING + this.y);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x, BASE_SIZE + PADDING + this.y);
				this.unitArr[2].updateCoors(this.x, 2*(BASE_SIZE + PADDING) + this.y);
				this.unitArr[3].updateCoors(BASE_SIZE + PADDING + this.x, this.y);

				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}

			if (newX >= 0 && newX + this.w <= WIDTH && newY + this.h <= HEIGHT) {
				this.x = newX;
				this.y = newY
				this.state = 0;
				return true;
			} else {
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}
		}
	}
};