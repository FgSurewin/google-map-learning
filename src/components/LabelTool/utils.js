import { RATIO } from "../../views/Validation/asset";
import { getColor } from "../Box/utils";

export function calculateStartPoint(start, end) {
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
		x: posX,
		y: posY,
		width: width,
		height: height,
	};
}

export function resizeBy(start, end, type) {
	const { x, y, width, height } = calculateStartPoint(start, end);
	return {
		position: "absolute",
		left: x,
		top: y,
		width: width,
		height: height,
		border: `2px solid ${getColor(type)}`,
		// border: `2px solid black`,
	};
}

export const rearrangePoints = (start, end) => {
	const newStart = {
		x: 0,
		y: 0,
	};
	const newEnd = {
		x: 0,
		y: 0,
	};
	const { x, y, width, height } = calculateStartPoint(start, end);
	newStart.x = x / RATIO;
	newStart.y = y / RATIO;
	newEnd.x = (x + width) / RATIO;
	newEnd.y = (y + height) / RATIO;
	return {
		newStart,
		newEnd,
	};
};
