export const Target = {
	DOOR: "door",
	KNOB: "knob",
	RAMP: "ramp",
	STAIRS: "stairs",
};

export const getColor = (type) => {
	const { DOOR, KNOB, RAMP, STAIRS } = Target;
	let color = "#000";
	switch (type) {
		case DOOR:
			color = "red";
			break;
		case KNOB:
			color = "blue";
			break;
		case RAMP:
			color = "yellow";
			break;
		case STAIRS:
			color = "green";
			break;

		default:
			break;
	}
	return color;
};
