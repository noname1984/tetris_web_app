'use strict';

class IShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
	}

	drawVerticalBasic() {
		this.unitArr[0].draw(0, 0, this.x, this.y);
		this.unitArr[1].draw(0, BASE_SIZE + PADDING, this.x, this.y);
		this.unitArr[2].draw(0, 2*(BASE_SIZE + PADDING), this.x, this.y);
		this.unitArr[3].draw(0, 3*(BASE_SIZE + PADDING), this.x, this.y);
	}

	drawHorizontalBasic() {
		this.unitArr[0].draw(0, 0, this.x, this.y);
		this.unitArr[1].draw(BASE_SIZE + PADDING, 0, this.x, this.y);
		this.unitArr[2].draw(2*(BASE_SIZE + PADDING), 0, this.x, this.y);
		this.unitArr[3].draw(3*(BASE_SIZE + PADDING), 0, this.x, this.y);
	}

	vertical() {
		this.c.save();
		this.c.translate(this.x, this.y);
		this.drawVerticalBasic(this.x, this.y);
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
			var newX = x + 2*(BASE_SIZE + PADDING);
			var newY = y - 2*(BASE_SIZE + PADDING);

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x, BASE_SIZE + PADDING + this.y);
			this.unitArr[2].updateCoors(this.x, 2*(BASE_SIZE + PADDING) + this.y);
			this.unitArr[3].updateCoors(this.x, 3*(BASE_SIZE + PADDING) + this.y);
			
			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x + BASE_SIZE + PADDING, this.y);
				this.unitArr[2].updateCoors(this.x + 2*(BASE_SIZE + PADDING), this.y);
				this.unitArr[3].updateCoors(this.x + 3*(BASE_SIZE + PADDING), this.y);
				
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				
				return false;
			}

			if (newX >= 0 && (newX + this.h) <= WIDTH && (newY + this.w) <= HEIGHT) {
					this.x = newX;
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
		} else {
			var newX = x - 2*(BASE_SIZE + PADDING);
			var newY = y + 2*(BASE_SIZE + PADDING);

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x + BASE_SIZE + PADDING, this.y);
			this.unitArr[2].updateCoors(this.x + 2*(BASE_SIZE + PADDING), this.y);
			this.unitArr[3].updateCoors(this.x + 3*(BASE_SIZE + PADDING), this.y);
			
			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x, BASE_SIZE + PADDING + this.y);
				this.unitArr[2].updateCoors(this.x, 2*(BASE_SIZE + PADDING) + this.y);
				this.unitArr[3].updateCoors(this.x, 3*(BASE_SIZE + PADDING) + this.y);
				
				addUnit(this.unitArr[0]);
				addUnit(this.unitArr[1]);
				addUnit(this.unitArr[2]);
				addUnit(this.unitArr[3]);
				return false;
			}

			if (newX >= 0 && (newX + this.w) <= WIDTH && (newY + this.h) <= HEIGHT) {
				this.x = newX;
				this.y = newY;
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