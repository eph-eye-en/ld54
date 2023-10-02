const STACK_HORIZ = false;
const STACK_VERT = true;

class Stack extends UiElement {
	constructor(direction, weightings) {
		super();

		this.direction = direction;
		this.weightings = weightings;

		this.bgColour = [0, 0];

		this.children = this.weightings.map(() => null);
	}

	getTotalWeight() {
		return this.weightings.reduce((a, b) => a + b, 0);
	}

	draw(x, y, w, h) {
		rectMode(CORNER);
		fill(this.bgColour);
		noStroke();
		rect(x, y, w, h);
		this.forEach(x, y, w, h, (c, cx, cy, cw, ch) => c.draw(cx, cy, cw, ch));
	}

	mousePressed(x, y, w, h, mx, my) {
		if(mx < x || mx > x + w
		|| my < y || my > y + h)
			return;
		const tw = this.getTotalWeight();
		let cw = 0;
		for(let i = 0; i < this.children.length; i++) {
			cw += this.weightings[i];
			if(this.direction == STACK_HORIZ && mx <= x + cw/tw * w
			|| this.direction == STACK_VERT && my <= y + cw/tw * h) {
				if(this.children[i] != null) {
					const { x: cx, y: cy, w: cw, h: ch } =
						this.getChildArea(x, y, w, h, i);
					this.children[i].mousePressed(cx, cy, cw, ch, mx, my);
				}
				break;
			}
		}
	}

	forEach(x, y, w, h, f) {
		const totalWeight = this.getTotalWeight();
		let currWeight = 0;
		for(let i = 0; i < this.children.length; i++) {
			if(this.children[i] != null) {
				if(this.direction == STACK_VERT)
					f(
						this.children[i],
						x,
						y + currWeight / totalWeight * h,
						w,
						h * this.weightings[i] / totalWeight
					);
				else
					f(
						this.children[i],
						x + currWeight / totalWeight * w,
						y,
						w * this.weightings[i] / totalWeight,
						h
					);
			}
			currWeight += this.weightings[i];
		}
	}

	getChildArea(x, y, w, h, i) {
		const childWeight = this.weightings[i];
		const totalWeight = this.getTotalWeight();
		const prevWeight = this.weightings.reduce(
			(a, b, j) => j < i ? a + b : a,
			0);
		if(this.direction == STACK_HORIZ)
			return {
				x: x + w * prevWeight / totalWeight,
				y,
				w: w * childWeight / totalWeight,
				h,
			};
		else
			return {
				x,
				y: y + h * prevWeight / totalWeight,
				w,
				h: h * childWeight / totalWeight,
			};
	}
}