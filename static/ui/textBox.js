class TextBox extends UiElement {
	constructor(text, textColour, fontSize, horizAlign, vertAlign) {
		super();

        this.text = text;
        this.textColour = textColour;
        this.fontSize = fontSize;
        this.padding = padding;
		this.horizAlign = horizAlign == null ? LEFT : horizAlign;
		this.vertAlign = vertAlign == null ? TOP : vertAlign;

        this.bgColour = [0, 0];
		this.padding = 10;
		this.style = NORMAL;
	}

	draw(x, y, w, h) {
		rectMode(CORNER);
		fill(this.bgColour);
		noStroke();
		rect(x, y, w, h);

		fill(this.textColour);
		textSize(this.fontSize);
		textStyle(this.style);
		textAlign(this.horizAlign, this.vertAlign);
		const ty = this.vertAlign === TOP ? y + this.padding
				 : this.vertAlign === CENTER ? y + h / 2
				 : y + h - this.padding;
		text(this.text, x, ty, w - this.padding / 2);
	}
}
