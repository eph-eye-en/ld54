class Hotbar extends UiElement {
	constructor(structureTypes) {
		super();

		this.types = structureTypes;

		this.items = null;
		this.selectedIdx =  0;
	}

	getSlotSize(w, h) {
		return Math.min(w / this.items.length, h);
	}

	getHoveredIndex(x, y, w, h, px, py) {
		const numSlots = this.items.length;
		const slotSize = this.getSlotSize(w, h);

		px -= x + w / 2 - numSlots / 2 * slotSize;
		py -= y + h / 2 - slotSize / 2;

		if(px < 0 || px >= numSlots * slotSize
		|| py < 0 || py >= slotSize)
			return null;

		return Math.floor(px / slotSize);
	}

	draw(x, y, w, h) {
		const numSlots = this.items.length;
		const slotSize = this.getSlotSize(w, h);
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w / 2 - (numSlots - 1) / 2 * slotSize, h / 2);
	
		for(let i = 0; i < numSlots; i++) {
			const s = this.types[this.items[i]];
			fill(200, 50);
			stroke(100, 100, 200);
			strokeWeight(3);
			square(i * slotSize, 0, slotSize, 8);
	
			fill(s.colour);
			stroke(200);
			strokeWeight(1);
			square(i * slotSize, 0, slotSize * 0.8, slotSize * 0.8 / 5);
		}
	
		const hovIdx = this.getHoveredIndex(x, y, w, h, mx, my);
		noFill();
		strokeWeight(5);
		stroke(150, 250, 150);
		square(slotSize * this.selectedIdx, 0, slotSize);
		if(hovIdx != null) {
			stroke(150, 150, 250);
			square(slotSize * hovIdx, 0, slotSize);
		}

		pop();
	}

	mousePressed(x, y, w, h, mx, my) {
		const hovIdx = this.getHoveredIndex(x, y, w, h, mx, my);
		if(hovIdx != null && this.onMousePressed)
			this.onMousePressed(hovIdx);
	}
}
