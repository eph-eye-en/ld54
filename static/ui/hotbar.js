class Hotbar {
	constructor(structureTypes, items) {
		this.types = structureTypes;
		this.items = items;
	}

	draw(x, y, w, h) {
		const numSlots = this.items.length;
		const slotSize = Math.min(w / numSlots, h);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w / 2 - (numSlots - 1) / 2 * slotSize, h / 2);
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);
		mx += slotSize / 2;
		my += slotSize / 2;
	
		for(let i = 0; i < numSlots; i++) {
			const s = this.types[this.items[i]];
			fill(200, 50);
			stroke(100, 100, 200);
			strokeWeight(3);
			square(i * slotSize, 0, slotSize);
	
			fill(s.colour);
			stroke(200);
			strokeWeight(1);
			square(i * slotSize, 0, slotSize * 0.8, slotSize * 0.8 / 5);
		}
	
		if(mx > 0 && mx < numSlots * slotSize
		&& my > 0 && my < slotSize) {
			const i = Math.floor(mx / slotSize);
			noFill();
			stroke(150, 150, 250);
			strokeWeight(5);
			square(slotSize * i, 0, slotSize);
		}
		pop();
	}
}
