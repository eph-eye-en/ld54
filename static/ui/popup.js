class Popup extends UiElement {
	constructor(horizScale, vertScale, main, popup) {
		super();

		this.horizScale = horizScale;
		this.vertScale = vertScale;
		this.main = main;
		this.popup = popup;

		this.popupVisible = false;
	}

	showPopup() {
		this.popupVisible = true;
	}

	hidePopup() {
		this.popupVisible = false;
	}

	draw(x, y, w, h) {
		this.main.draw(x, y, w, h);
		if(this.popupVisible) {
			const { x: px, y: py, w: pw, h: ph } = this.getPopupArea(x, y, w, h);
			this.popup.draw(px, py, pw, ph);
		}
	}

	mousePressed(x, y, w, h, mx, my) {
		const { x: px, y: py, w: pw, h: ph } = this.getPopupArea(x, y, w, h);
		if(this.popupVisible
		&& mx >= px && mx < px + pw
		&& my >= py && my < py + ph)
			this.popup.mousePressed(px, py, pw, ph, mx, my);
		else
			this.main.mousePressed(x, y, w, h, mx, my);
	}

	getPopupArea(x, y, w, h) {
		return {
			x: x + w / 2 - (w * this.horizScale) / 2,
			y: y + h / 2 - (h * this.vertScale) / 2,
			w: w * this.horizScale,
			h: h * this.vertScale,
		};
	}
}