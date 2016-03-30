'use strict';

class UnitSquare {
	constructor(context, tl, tr, bl, br, color) {
		this.tl = tl;
		this.tr = tr;
		this.bl = bl;
		this.br = br;
		this.c = context;
		this.color = color;
	}

	get tl() {
		return this._tl;
	}

	set tl(val) {
		this._tl = val;
	}

	get tr() {
		return this._tr;
	}

	set tr(val) {
		this._tr = val;
	}

	get bl() {
		return this._bl;
	}

	set bl(val) {
		this._bl = val;
	}

	get br() {
		return this._br;
	}

	set br(val) {
		this._br = val;
	}

	get color() {
		return this._color;
	}

	set color(val) {
		this._color = val;
	}

	updateCoors(x, y) {
		this._tl = [x, y];
		this._tr = [x + BASE_SIZE, y];
		this._bl = [x, y + BASE_SIZE];
		this._br = [x + BASE_SIZE, y + BASE_SIZE];
	}

	draw(x, y, x1, y1) {
		this.c.save();
		this.c.strokeStyle = this.color;
		this.c.translate(x, y);
		this.c.beginPath();
		this.c.moveTo(0, 0);
		this.c.lineTo(BASE_SIZE, 0);
		this.c.lineTo(BASE_SIZE, BASE_SIZE);
		this.c.lineTo(0, BASE_SIZE);
		this.c.closePath();
		this.c.stroke();
		this.c.restore();

		this.updateCoors(x1 + x, y1 + y);
	}
}