class Structure {
	constructor(grid, { name, colour, shape, centre, produces, consumes }) {
		this.grid = grid;
		this.x = null;
		this.y = null;

		this.name = name;
		this.colour = colour;
		this.shape = shape;
		this.centre = centre;
		this.produces = produces;
		this.consumes = consumes;
	}

	copy() {
		return new Structure(this.grid, {
			name: this.name,
			colour: this.colour,
			shape: this.shape,
			centre: this.centre,
			produces: this.produces,
			consumes: this.consumes,
		});
	}

	canPlaceAt(x, y) {
		let canPlace = true;
		this.forEach((cx, cy) => {
			const c = this.grid.getCell(x + cx, y + cy);
			if(!c.valid || !c.available)
				canPlace = false;
		})
		return canPlace;
	}

	placeAt(x, y) {
		if(!this.canPlaceAt(x, y))
			return false;
		
		this.forEach((cx, cy) => this.grid.fillCell(x + cx, y + cy, this));
		this.x = x;
		this.y = y;
		return true;
	}

	remove() {
		this.forEach((cx, cy) => this.grid.emptyCell(this.x + cx, this.y + cy));
	}

	produces(r) {
		return this.produces[r] || 0;
	}

	consumes(r) {
		return this.consumes[r] || 0;
	}

	forEach(f) {
		for(let cx = 0; cx < this.shape.length; cx++) {
			const col = this.shape[cx];
			for(let cy = 0; cy < col.length; cy++) {
				const cellNeeded = col[cy];
				if(!cellNeeded)
					continue;
				f(cx - this.centre.x, cy - this.centre.y);
			}
		}
	}
}
