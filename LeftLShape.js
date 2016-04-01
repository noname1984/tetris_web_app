'use strict';

class LeftLShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
		this.BASE_PLUS_PADDING = BASE_SIZE + PADDING;
	}

	drawDown() {
		this.unitArr[0].draw(this.x, this.y);
		this.unitArr[1].draw(this.x + this.BASE_PLUS_PADDING, this.y);
		this.unitArr[2].draw(this.x + 2*this.BASE_PLUS_PADDING, this.y);
		this.unitArr[3].draw(this.x + 2*this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);

		this.state = 0;
	}

	drawLeft() {
		this.unitArr[0].draw(this.x + this.BASE_PLUS_PADDING, this.y);
		this.unitArr[1].draw(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.x + this.BASE_PLUS_PADDING, this.y + 2*this.BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.x, this.y + 2*this.BASE_PLUS_PADDING);

		this.state = 1;
	}

	drawUp() {
		this.unitArr[0].draw(this.x, this.y);
		this.unitArr[1].draw(this.x, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.x + 2*this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);

		this.state = 2;
	}

	drawRight() {
		this.unitArr[0].draw(this.x, this.y);
		this.unitArr[1].draw(this.x, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.x, this.y + 2*this.BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.x + this.BASE_PLUS_PADDING, this.y);

		this.state = 3;
	}

	upArrowHandler(x, y) {
		if (this.state === 0) {
			var newY = y - this.BASE_PLUS_PADDING;
			this.unitArr[0].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);
			this.unitArr[1].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + 2*this.BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.x, this.y + 2*this.BASE_PLUS_PADDING);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);
				this.unitArr[2].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y);
				this.unitArr[3].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
				
				this.addShapeSquaresToDrawnList();
				return false;
			}

			if (newY + this._w <= HEIGHT) {
				this.y = newY;
				this.state = 1;
				return true;
			} else {
				this.addShapeSquaresToDrawnList();
				return false;
			}
		} else if (this.state === 1) {
			var newWidth = x + this.w;
			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);
				this.unitArr[1].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + 2*this.BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.x, this.y + 2*this.BASE_PLUS_PADDING);

				this.addShapeSquaresToDrawnList();
				return false;
			}

			if (newWidth <= WIDTH) {
				this.state = 2;
			}
			return true;

		} else if (this.state === 2) {
			var newX = x + this.BASE_PLUS_PADDING;
			var newHeight = y + this.w;

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.x, this.y + 2*this.BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);

				this.addShapeSquaresToDrawnList();
				return false;
			}

			if (newHeight > HEIGHT) {
				this.addShapeSquaresToDrawnList();
				return false;
			} else {
				if (newX >= 0 && newX + this.h <= WIDTH) {
					this.x = newX;
					this.state = 3;
				}
				return true;
			}
		} else {
			var newX = x - this.BASE_PLUS_PADDING;
			var newY = y + this.BASE_PLUS_PADDING;

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);
			this.unitArr[2].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y);
			this.unitArr[3].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);

			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.x, this.y + 2*this.BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);

				this.addShapeSquaresToDrawnList();
				return false;
			}

			if (newY + this.h > HEIGHT) {
				this.addShapeSquaresToDrawnList();
				return false;
			} else {
				if (newX >= 0 && newX + this.w <= WIDTH) {
					this.x = newX;
					this.y = newY
					this.state = 0;
				}
				return true;
			}
		}
	}
};