class GridDrawer extends UiElement {
	constructor(grid, hoverStructure) {
		super();

		this.grid = grid;
		this.hoverStructure = hoverStructure;
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
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

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

		const hov = this.getHoveredCell(x, y, w, h, mx, my);
		if(hov != null) {
			strokeWeight(3);
			if(this.hoverStructure.canPlaceAt(hov.x, hov.y)) {
				stroke(255);
				fill(this.hoverStructure.colour, 80);
			}
			else {
				stroke(255, 20, 20);
				fill(200, 70, 70);
			}
			rect(hov.x * cellSize, hov.y * cellSize,
				cellSize, cellSize,
				cellSize / 5);
		}

		pop();
	}

	mousePressed(x, y, w, h, mx, my) {
		const hov = this.getHoveredCell(x, y, w, h, mx, my);
		if(hov != null && this.onMousePressed)
			this.onMousePressed(hov.x, hov.y);
	}
}