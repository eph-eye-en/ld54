class GridConstraintDrawer extends UiElement {
	constructor(grid, constraints, fontSize) {
		super();

		this.grid = grid;
		this.constraints = constraints;
		this.fontSize = fontSize;
	}

	get lineHeight() {
		return this.fontSize * 1.5;
	}

	draw(x, y, w, h) {
		const lh = this.lineHeight;
		const numLines = this.constraints.resources.length
					   + this.constraints.structures.length;

		push();
		translate(x, y);

		rectMode(CORNER);
		fill(50, 50, 250);
		stroke(50, 50, 250);
		strokeWeight(3);
		rect(0, 0, w, lh);

		fill(50, 50, 250, 30);
		stroke(50, 50, 250);
		strokeWeight(3);
		rect(0, lh, w, numLines * lh);

		translate(this.fontSize / 3, lh / 2);

		textSize(this.fontSize);
		textAlign(LEFT, CENTER);
		fill(255);
		noStroke();
		text("Requirements", 0, 0);

		translate(0, lh)

		noStroke();
		for(let rc of this.constraints.resources) {
			const net = GridConstraints.getNetResource(this.grid, rc.res);
			if(net >= rc.min)
				fill(150, 200, 150);
			else
				fill(250, 150, 150);
			text(`${rc.res}: ${net} / ${rc.min}`, 0, 0);

			translate(0, lh);
		}
		for(let sc of this.constraints.structures) {
			const count = GridConstraints.getStructureCount(
				this.grid, sc.struct.name);
			if(count >= sc.min)
				fill(150, 200, 150);
			else
				fill(250, 150, 150);
			text(`${sc.struct.name}: ${count} / ${sc.min}`, 0, 0);

			translate(0, lh);
		}

		pop();
	}
}
