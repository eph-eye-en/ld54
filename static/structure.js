class Structure {
	constructor(grid) {
		this.grid = grid;
		this.x = null;
		this.y = null;
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
}
