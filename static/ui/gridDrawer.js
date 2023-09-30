class GridDrawer {
	constructor(grid) {
		this.grid = grid;
	}

	draw(x, y, w, h) {
		const g = this.grid;
		const cellSize = Math.min(w / g.width, h / g.height);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w / 2 - (g.width - 1) / 2 * cellSize,
				  h / 2 - (g.height - 1) / 2 * cellSize);
		g.forEach((c, cx, cy) => {
			stroke(200);
			strokeWeight(1);
			if(c.available)
				fill(200, 70);
			else
				fill(c.structure.colour);
			rect(cx * cellSize, cy * cellSize,
				cellSize, cellSize,
				cellSize / 5);
		});
		pop();
	}
}