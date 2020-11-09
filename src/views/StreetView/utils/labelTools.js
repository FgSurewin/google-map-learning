export const generateBorderStyle = (color) => ({
	border: `6px solid ${color}`,
});

export const colors = {
	default: "#000",
	success: "rgb(0, 222, 38)",
};

export const generateLabelStyle = (x, y, color) => ({
	left: `${x}px`,
	top: `${y}px`,
	backgroundColor: color,
});
