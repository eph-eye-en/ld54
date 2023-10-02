class GridDrawer extends UiElement {
	constructor() {
		super();

		this.grid = null;
		this.hoverStructure = null;
	}

	getCellSize(w, h) {
		return Math.min(w / this.grid.width, h / this.grid.height);
	}

	getHoveredCell(x, y, w, h, px, py) {
		const g = this.grid;
		const cellSize = this.getCellSize(w, h);
		
		px -= x + w / 2 - g.width * cellSize / 2;
		py -= y + h / 2 - g.height * cellSize / 2;

		if(px < 0 || px >= g.width * cellSize
		|| py < 0 || py >= g.height * cellSize)
			return null;

		return {
			x: Math.floor(px / cellSize),
			y: Math.floor(py / cellSize),
		};
	}

	draw(x, y, w, h) {
		const g = this.grid;
		const cellSize = this.getCellSize(w, h);
		const cornerRadius = cellSize / 7;
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w / 2 - (g.width - 1) / 2 * cellSize,
				  h / 2 - (g.height - 1) / 2 * cellSize);
		g.forEach((c, cx, cy) => {
			if(c.available) {
				stroke(200);
				strokeWeight(1);
				fill(200, 70);
				rect(cx * cellSize, cy * cellSize,
					cellSize * 0.95, cellSize * 0.95,
					cellSize / 8);
			}
			else {
				stroke(c.structure.appearance.accent);
				strokeWeight(3);
				fill(c.structure.appearance.fill);

				const { tl, tr, br, bl, top, right, bottom, left } =
					this.getCellEdges(g, c, cx, cy, cellSize / 8);
				rect(cx * cellSize, cy * cellSize,
					cellSize, cellSize,
					tl, tr, br, bl);
				noStroke();
				if(top)
					rect(cx * cellSize, (cy - 1/2) * cellSize,
						cellSize * 0.8, 4);
				if(right)
					rect((cx + 1/2) * cellSize, cy * cellSize,
						4, cellSize * 0.8);
				if(bottom)
					rect(cx * cellSize, (cy + 1/2) * cellSize,
						cellSize * 0.8, 4);
				if(left)
					rect((cx - 1/2) * cellSize, cy * cellSize,
						4, cellSize * 0.8);
			}
		});

		const hov = this.getHoveredCell(x, y, w, h, mx, my);
		if(hov != null) {
			strokeWeight(3);
			if(this.hoverStructure.canPlaceAt(this.grid, hov.x, hov.y)) {
				stroke(255);
				fill(...this.hoverStructure.appearance.fill, 90);
			}
			else {
				stroke(255, 20, 20);
				fill(200, 70, 70, 70);
			}
			this.hoverStructure.forEach((cx, cy) => {
				if(g.getCell(hov.x + cx, hov.y + cy).valid)
					rect((hov.x + cx) * cellSize, (hov.y + cy) * cellSize,
						cellSize, cellSize,
						cornerRadius);
			});
		}

		pop();
	}

	getCellEdges(grid, c, cx, cy, value) {
		let tl, tr, br, bl;
		tl = tr = br = bl = value;
		const topCell = grid.getCell(cx, cy - 1);
		const top = topCell.valid && !topCell.available
			&& topCell.structure == c.structure;
		if(top)
			tl = tr = 0;
		const rightCell = grid.getCell(cx + 1, cy);
		const right = rightCell.valid && !rightCell.available
			&& rightCell.structure == c.structure;
		if(right)
			tr = br = 0;
		const bottomCell = grid.getCell(cx, cy + 1);
		const bottom = bottomCell.valid && !bottomCell.available
			&& bottomCell.structure == c.structure;
		if(bottom)
			bl = br = 0;
		const leftCell = grid.getCell(cx - 1, cy);
		const left = leftCell.valid && !leftCell.available
			&& leftCell.structure == c.structure;
		if(left)
			tl = bl = 0;
		return {
			tl, tr, bl, br,
			top, bottom, left, right,
		};
	}

	mousePressed(x, y, w, h, mx, my) {
		const hov = this.getHoveredCell(x, y, w, h, mx, my);
		if(hov != null && this.onMousePressed)
			this.onMousePressed(hov.x, hov.y);
	}
}