class Shape {
	constructor(context, x, y, state, actionByState) {
		this.c = context;
		this.x = x;
		this.y = y;
		this.state = state;
		this.actionByState = actionByState;
	}

	get x() {
		return this.x;
	}

	set x(xVal) {
		this.x = xVal;
	}

	get y() {
		return this.y;
	}

	set y(yVal) {
		this.y = yVal;
	}

	get state() {
		return this.state;
	}

	set state(stateVal) {
		this.state = stateVal;
	}

	draw() {
		var action = this.actionByState[this.state];
		this[action]();
	}

	upArrowHandler() {
		console.log('need to overwrite this method');
	}

	keyDownHandler(keyCode) {
		var x = this.x;
		var y = this.y;

		if (keyCode == 37) {	// left arrow
			this.x = x - BASE_SIZE;
		} else if(keyCode == 38) {	// up arrow
			this.upArrowHandler(x, y);
		} else if (keyCode == 39) {	// right arrow
			this.x = x + BASE_SIZE;
		} else if (keyCode == 40) {	// down arrow
			this.y = y + BASE_SIZE;
		}
	};
}