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
			// color = "red";
			color = "#ec4646";
			break;
		case KNOB:
			// color = "green";
			color = "#00af91";
			break;
		case RAMP:
			// color = "yellow";
			color = "#fed049";
			break;
		case STAIRS:
			// color = "blue";
			color = "#1a508b";
			break;

		default:
			break;
	}
	return color;
};
