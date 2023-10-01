class EmailList extends UiElement {
	constructor(levelNumber) {
		super();

        this.levelNumber = levelNumber;
        this.selectedIdx = 0;
	}

	getEmailHeight(w, h) {
        return 300;
		return Math.floor(h / (this.levelNumber+1));
	}

	getHoveredIndex(x, y, w, h, px, py) {
		const EmailHeight = this.getEmailHeight(w, h);

        px -= x;
        py -= y;

		if(px < 0 || px >= w
		|| py < 0 || py >= this.levelNumber*EmailHeight)
			return null;

		return Math.floor(py / EmailHeight);
	}

	draw(x, y, w, h) {
		const emailHeight = this.getEmailHeight(w, h);
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w/2, emailHeight/2);
	
		const hovIdx = this.getHoveredIndex(x, y, w, h, mx, my);
		for(let i = 0; i < this.levelNumber; i++) {
            if (i==hovIdx)
                fill(230,230,255)
            else
			    fill(220);
			stroke(150);
			strokeWeight(3);
			rect(0, i * emailHeight, w, emailHeight, 8);
            
		}
	
		noFill();
		strokeWeight(5);
		stroke(150, 250, 150);
		rect(0, emailHeight * this.selectedIdx, w, emailHeight);
		if(hovIdx != null) {
			stroke(150, 150, 250);
			rect(0, emailHeight * hovIdx, w, emailHeight);
		}

		pop();
	}

	mousePressed(x, y, w, h, mx, my) {
		const hovIdx = this.getHoveredIndex(x, y, w, h, mx, my);
		if(hovIdx != null && this.onMousePressed)
			this.onMousePressed(hovIdx);
	}
}
