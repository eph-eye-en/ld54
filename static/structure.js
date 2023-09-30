class Structure {
	constructor(grid, { name, colour, produces, consumes }) {
		this.grid = grid;
		this.x = null;
		this.y = null;

		this.name = name;
		this.colour = colour;
		this.produces = produces;
		this.consumes = consumes;
	}

	canPlaceAt(x, y) {
		const c = this.grid.getCell(x, y);
		return c.valid && c.available;
	}

	placeAt(x, y) {
		if(!this.canPlaceAt(x, y))
			return false;
		
		this.grid.placeAt(x, y, this);
	}

	produces(r) {
		return this.produces[r] || 0;
	}

	consumes(r) {
		return this.consumes[r] || 0;
	}
}
