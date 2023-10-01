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

	copy() {
		return new Structure(this.grid, {
			name: this.name,
			colour: this.colour,
			produces: this.produces,
			consumes: this.consumes,
		});
	}

	canPlaceAt(x, y) {
		const c = this.grid.getCell(x, y);
		return c.valid && c.available;
	}

	placeAt(x, y) {
		if(!this.canPlaceAt(x, y))
			return false;
		
		const succ = this.grid.placeAt(x, y, this);
		if(succ) {
			this.x = x;
			this.y = y;
		}
		return succ;
	}

	remove() {
		return this.grid.emptyCell(this.x, this.y);
	}

	produces(r) {
		return this.produces[r] || 0;
	}

	consumes(r) {
		return this.consumes[r] || 0;
	}
}
