const position = {
	RIGHT_TOP: "right_top",
	LEFT_TOP: "left_top",
	RIGHT_BOTTOM: "right_bottom",
	LEFT_BOTTOM: "left_bottom",
};

export const getStyle = (start, end, node) => {
	const { RIGHT_BOTTOM, RIGHT_TOP, LEFT_BOTTOM, LEFT_TOP } = position;
	let style = {
		position: "absolute",
		left: start.x,
		top: start.y,
		width: end.x || 1,
		height: end.y || 1,
		border: "2px solid green",
	};
	switch (getDirection(start, end)) {
		case RIGHT_TOP:
			style = {
				position: "absolute",
				left: start.x,
				bottom: node.height - start.y,
				width: end.x || 1,
				height: end.y || 1,
				border: "2px solid green",
			};
			break;
		case LEFT_TOP:
			style = {
				position: "absolute",
				right: node.width - start.x,
				bottom: node.height - start.y,
				width: end.x || 1,
				height: end.y || 1,
				border: "2px solid green",
			};
			break;
		case RIGHT_BOTTOM:
			break;
		case LEFT_BOTTOM:
			style = {
				position: "absolute",
				right: node.width - start.x,
				bottom: node.height - start.y,
				width: end.x || 1,
				height: end.y || 1,
				border: "2px solid green",
			};
			break;
		default:
			break;
	}
	return style;
};

function getDirection(start, end) {
	let direction;
	if (end.x - start.x >= 0 && end.y - start.y >= 0) {
		direction = position.RIGHT_BOTTOM;
	} else if (end.x - start.x <= 0 && end.y - start.y >= 0) {
		direction = position.LEFT_BOTTOM;
	} else if (end.x - start.x >= 0 && end.y - start.y <= 0) {
		direction = position.RIGHT_TOP;
	} else if (end.x - start.x <= 0 && end.y - start.y <= 0) {
		direction = position.LEFT_TOP;
	}
	return direction;
}

export function debounce(fn, time) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(fn.bind(...args), time);
	};
}
