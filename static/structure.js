class Structure {
	constructor(props) {
		this.grid = null;
		this.x = null;
		this.y = null;

		this.props = props;
	}

	copy() {
		return new Structure(this.props);
	}

	canPlaceAt(grid, x, y) {
		let canPlace = true;
		this.forEach((cx, cy) => {
			const c = grid.getCell(x + cx, y + cy);
			if(!c.valid || !c.available)
				canPlace = false;
		})
		return canPlace;
	}

	fillCells(grid, x, y) {
		this.forEach((cx, cy) => grid.fillCell(x + cx, y + cy, this));
		this.grid =  grid;
		this.x = x;
		this.y = y;
	}

	emptyCells() {
		this.forEach((cx, cy) => this.grid.emptyCell(this.x + cx, this.y + cy));
		this.grid = null;
		this.x = null;
		this.y = null;
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

	get name() {
		return this.props.name;
	}

	get slug() {
		return this.props.slug;
	}

	get colour() {
		return this.props.colour;
	}

	get shape() {
		return this.props.shape;
	}

	get centre() {
		return this.props.centre;
	}

	produces(r) {
		return this.props.produces[r] || 0;
	}

	consumes(r) {
		return this.props.consumes[r] || 0;
	}
}
