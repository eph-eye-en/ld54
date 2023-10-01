class Button extends UiElement {
	constructor(buttonText, clickedEvent, buttonColour) {
		super();

        this.buttonText = buttonText;
		this.clickedEvent = clickedEvent;
        this.buttonColour = buttonColour;
        this.isHovered = false;
	}

	isHovering(x, y, w, h, px, py) {
		if(px > x && px < x+w && py > y && py < y+h)
			return true;
		else
			return false;
		
	}

	draw(x, y, w, h) {
		let { x: mx, y: my } = getLocalCoords(mouseX, mouseY);

		push();
		rectMode(CENTER);
		translate(x, y);
		translate(w / 2, h / 2);


        fill(this.buttonColour);
        stroke(100, 100, 200);
        strokeWeight(3);
        rect(0, 0, w, h, 8);
    

		this.isHovered = this.isHovering(x, y, w, h, mx, my);
		if  (this.isHovered)
		{
			noFill();
			strokeWeight(5);
			stroke(150, 150, 250);
			rect(0, 0, w, h);
		}

		textSize(30);
		textAlign(CENTER, CENTER);
		fill(255);
		noStroke();
		text(this.buttonText, 0, 0);
		

		pop();
	}

	mousePressed(x, y, w, h, mx, my) {
		console.log("Is clicked");
		if(this.isHovered){
			console.log("Is Hovering and clicked");
			this.clickedEvent();
		}
	}
}
