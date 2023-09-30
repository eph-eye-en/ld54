function drawHotbar(structures, slotSize) {
	push();
	const { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

	translate(slotSize / 2, slotSize / 2);
	for(let i = 0; i < structures.length; i++) {
		const s = structures[i];
		fill(200, 50);
		stroke(100, 100, 200);
		strokeWeight(3);
		square(0, 0, slotSize);

		fill(s.colour);
		stroke(200);
		strokeWeight(1);
		square(0, 0, slotSize * 0.8, slotSize * 0.8 / 5);

		translate(slotSize, 0);
	}
	pop();

	if(mx > 0 && mx < structures.length * slotSize
	&& my > 0 && my < slotSize) {
		const i = Math.floor(mx / slotSize);
		noFill();
		stroke(150, 150, 250);
		strokeWeight(5);
		square(slotSize / 2 + slotSize * i, slotSize / 2, slotSize);
	}
}
