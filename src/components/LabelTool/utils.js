export function resizeBy(start, end) {
	let width = end.x - start.x;
	let height = end.y - start.y;
	let posX = start.x;
	let posY = start.y;

	if (width < 0) {
		width = Math.abs(width);
		posX -= width;
	}

	if (height < 0) {
		height = Math.abs(height);
		posY -= height;
	}
	return {
		position: "absolute",
		left: posX,
		top: posY,
		width: width,
		height: height,
		border: "2px solid green",
	};
}
