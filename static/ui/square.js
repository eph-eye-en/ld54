class Square extends UiElement {
	constructor(horizAlign, vertAlign, child) {
		super();

		this.horizAlign = horizAlign;
		this.vertAlign = vertAlign;
		this.child = child;
	}

	draw(x, y, w, h) {
		const { x: cx, y: cy, w: cw, h: ch } = this.getChildArea(x, y, w, h);
		this.child.draw(cx, cy, cw, ch);
	}

	mousePressed(x, y, w, h, mx, my) {
		const { x: cx, y: cy, w: cw, h: ch } = this.getChildArea(x, y, w, h);
		if(mx < cx || mx > cx + cw
		|| my < cy || my > cy + ch)
			return;
		this.child.mousePressed(cx, cy, cw, ch, mx, my);
	}

	getChildArea(x, y, w, h) {
		if(w < h) {
			const cy = this.vertAlign === TOP ? y
				   : this.vertAlign === CENTER ? y + h / 2 - w / 2
				   : y + h - w;
			return {
				x,
				y: cy,
				w,
				h: w,
			};
		}
		else {
			const cx = this.horizAlign === LEFT ? x
				   : this.horizAlign === CENTER ? x + w / 2 - h / 2
				   : x + w - h;
			return {
				x: cx,
				y,
				w: h,
				h,
			};
		}
	}
}