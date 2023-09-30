function getLocalCoords(x0, y0) {
	const matrix = drawingContext.getTransform();
	const pd = pixelDensity();
	const { x, y } = matrix.inverse()
		.transformPoint(new DOMPoint(x0 * pd, y0 * pd));
	return { x, y };
}
