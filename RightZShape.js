'use strict';

class RightZShape extends Shape {
	constructor(context, x, y, width, height, state, numStates, unitArr) {
		super(context, x, y, width, height, state, numStates, unitArr);
		this.BASE_PLUS_PADDING = BASE_SIZE + PADDING;
	}

	vertical() {
		this.unitArr[0].draw(this.x, this.y);
		this.unitArr[1].draw(this.x, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[3].draw(this.x + this.BASE_PLUS_PADDING, this.y + 2*this.BASE_PLUS_PADDING);
		
		this.state = 1;
	}

	horizontal() {
		this.unitArr[0].draw(this.x, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[1].draw(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
		this.unitArr[2].draw(this.x + this.BASE_PLUS_PADDING, this.y);
		this.unitArr[3].draw(this.x + 2*this.BASE_PLUS_PADDING, this.y);
		
		this.state = 0;
	}

	upArrowHandler(x, y) {
		if (this.state === 0) {
			var newX = x + this.BASE_PLUS_PADDING;
			var newY = y - this.BASE_PLUS_PADDING;

			this.unitArr[0].updateCoors(this.x, this.y);
			this.unitArr[1].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[3].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + 2*this.BASE_PLUS_PADDING);
			
			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[1].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);
				this.unitArr[3].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y);
				
				this.addShapeSquaresToDrawnList();
				return false;
			}

			if (newY + this.w > HEIGHT) {
				this.addShapeSquaresToDrawnList();
				return false;
			} else {
				if (newX >= 0 && newX + this.h <= WIDTH) {
					this.x = newX;
					this.y = newY;
					this.state = 1;
				}
				return true;
			}
		} else {
			var newX = x - this.BASE_PLUS_PADDING;
			var newY = y + this.BASE_PLUS_PADDING;

			this.unitArr[0].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[1].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
			this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y);
			this.unitArr[3].updateCoors(this.x + 2*this.BASE_PLUS_PADDING, this.y);
			
			let testResult = testMove(this, 'rotate');
			if (!testResult) {
				this.unitArr[0].updateCoors(this.x, this.y);
				this.unitArr[1].updateCoors(this.x, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[2].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + this.BASE_PLUS_PADDING);
				this.unitArr[3].updateCoors(this.x + this.BASE_PLUS_PADDING, this.y + 2*this.BASE_PLUS_PADDING);
				
				this.addShapeSquaresToDrawnList();
				return false;
			}

			if (newY + this.h > HEIGHT) {
				this.addShapeSquaresToDrawnList();
				return false;
			} else {
				if (newX >= 0 && newX + this.w <= WIDTH) {
					this.x = newX;
					this.y = newY;
					this.state = 0;
				}
				return true;
			}
		}
	}
};