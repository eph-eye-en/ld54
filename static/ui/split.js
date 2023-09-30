const SPLIT_HORIZ = false;
const SPLIT_VERT = true;

class Split {
	constructor(vertical, weightings) {
		this.vertical = vertical;
		this.weightings = weightings;

		this.children = this.weightings.map(() => null);
	}

	draw(x, y, w, h) {
		this.forEach(x, y, w, h, (c, cx, cy, cw, ch) => c.draw(cx, cy, cw, ch));
	}

	mousePressed(x, y, w, h, mx, my) {
		this.forEach(x, y, w, h, (c, cx, cy, cw, ch) =>
			c.mousePressed(cx, cy, cw, ch, mx, my));
	}

	forEach(x, y, w, h, f) {
		const totalWeight = this.weightings.reduce((a, b) => a + b);
		let currWeight = 0;
		for(let i = 0; i < this.children.length; i++) {
			if(this.children[i] != null) {
				if(this.vertical == SPLIT_VERT)
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
}