const STRUCT_UP = 0;
const STRUCT_RIGHT = 1;
const STRUCT_DOWN = 2;
const STRUCT_LEFT = 3;

class Structure {
	constructor(props) {
		this.grid = null;
		this.x = null;
		this.y = null;

		this.props = props;
		this.direction = STRUCT_UP;
	}

	rotateClockwise() {
		this.direction = (this.direction + 1) % 4;
	}

	copy() {
		const s = new Structure(this.props);
		s.direction = this.direction;
		return s;
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
		for(let i = 0; i < this.shape.length; i++) {
			const col = this.shape[i];
			for(let j = 0; j < col.length; j++) {
				const cellNeeded = col[j];
				if(!cellNeeded)
					continue;
				const cx = i - this.centre.x;
				const cy = j - this.centre.y;
				switch(this.direction) {
					case STRUCT_UP:
						f(cx, cy);
						break;
					case STRUCT_RIGHT:
						f(-cy, cx);
						break;
					case STRUCT_DOWN:
						f(-cx, -cy);
						break;
					case STRUCT_LEFT:
						f(cy, -cx);
						break;
					default:
						throw new Error("Invalid structure direction");
				}
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
