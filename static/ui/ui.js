class Ui {
	constructor(x, y, w, h, root) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.root = root;
	}

	draw() {
		this.root.draw(this.x, this.y, this.w, this.h);
	}

	mousePressed(mouseX, mouseY) {
		this.root.mousePressed(this.x, this.y, this.w, this.h, mouseX, mouseY);
	}
}

function getLocalCoords(x0, y0) {
	const matrix = drawingContext.getTransform();
	const pd = pixelDensity();
	const { x, y } = matrix.inverse()
		.transformPoint(new DOMPoint(x0 * pd, y0 * pd));
	return { x, y };
}
