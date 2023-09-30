const mainGrid = new Grid(5, 5);
let cellSize = 50;

function setup() {
	createCanvas(500, 500);
}

function draw() {
	rectMode(CENTER);
	background(51);

	translate(100, 100);
	drawGrid(mainGrid);
}

function drawGrid(g) {
	g.forEach((c, x, y) => {
		stroke(200);
		strokeWeight(1);
		fill(200, 70);
		rect(x * cellSize, y * cellSize, cellSize, cellSize, cellSize / 5);
	});
}
