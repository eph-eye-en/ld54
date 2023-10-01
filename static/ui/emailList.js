class EmailList extends UiElement {
	constructor(levelAmount,levelNumber) {
		super();

        this.levelAmount = levelAmount;
        this.levelNumber = levelNumber;
	}

	getEmailHeight(w, h) {
		return Math.floor(h / (this.items.length+1));
	}

	// getHoveredIndex(x, y, w, h, px, py) {
	// 	const EmailHeight = this.getEmailHeight(w, h);

	// 	px -= x + w / 2 - numSlots / 2 * EmailHeight;
	// 	py -= y + h / 2 - EmailHeight / 2;

	// 	if(px < 0 || px >= numSlots * EmailHeight
	// 	|| py < 0 || py >= EmailHeight)
	// 		return null;

	// 	return Math.floor(px / EmailHeight);
	// }

	draw(x, y, w, h) {
		const emailHeight = this.getEmailHeight(w, h);
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w / 2 - (numSlots - 1) / 2 * emailHeight, h / 2);
	
		for(let i = 0; i < numSlots; i++) {
			const s = this.types[this.items[i]];
			fill(200, 50);
			stroke(100, 100, 200);
			strokeWeight(3);
			square(i * emailHeight, 0, emailHeight, 8);
	
			fill(s.colour);
			stroke(200);
			strokeWeight(1);
			square(i * emailHeight, 0, emailHeight * 0.8, emailHeight * 0.8 / 5);
		}
	
		const hovIdx = this.getHoveredIndex(x, y, w, h, mx, my);
		noFill();
		strokeWeight(5);
		stroke(150, 250, 150);
		square(emailHeight * this.selectedIdx, 0, emailHeight);
		if(hovIdx != null) {
			stroke(150, 150, 250);
			square(emailHeight * hovIdx, 0, emailHeight);
		}

		pop();
	}

	mousePressed(x, y, w, h, mx, my) {
		const hovIdx = this.getHoveredIndex(x, y, w, h, mx, my);
		if(hovIdx != null && this.onMousePressed)
			this.onMousePressed(hovIdx);
	}
}
