import React from "react";
import { resizeBy } from "./utils";

export default function LabelTool({ toggle, type, finish }) {
	const [start, setStart] = React.useState(null);
	const [end, setEnd] = React.useState(null);
	const drawing = React.useRef(false);
	const drawn = React.useRef(false);
	const frameRef = React.useRef(null);

	const handleClick = (e) => {
		const xVal = e.pageX - frameRef.current.getBoundingClientRect().left;
		const yVal = e.pageY - frameRef.current.getBoundingClientRect().top;
		if (!drawing.current && !drawn.current) {
			console.log("Drawing -> ", xVal, ", ", yVal);
			setStart({ x: xVal, y: yVal });
			drawing.current = true;
		} else if (drawing.current && !drawn.current) {
			console.log("Drawn -> ", xVal, ", ", yVal);
			drawing.current = false;
			drawn.current = true;
		}
	};

	// const handleDown = (e) => {
	// 	const xVal = e.nativeEvent.offsetX;
	// 	const yVal = e.nativeEvent.offsetY;
	// 	if (!drawing.current && !drawn.current) {
	// 		console.log("Drawing -> ", xVal, ", ", yVal);
	// 		setStart({ x: xVal, y: yVal });
	// 		drawing.current = true;
	// 	}
	// };

	// const handleUp = (e) => {
	// 	const xVal = e.nativeEvent.offsetX;
	// 	const yVal = e.nativeEvent.offsetY;
	// 	if (drawing.current && !drawn.current) {
	// 		console.log("Drawn -> ", xVal, ", ", yVal);
	// 		drawing.current = false;
	// 		drawn.current = true;
	// 	}
	// };

	const handleMove = (e) => {
		const xVal = e.pageX - frameRef.current.getBoundingClientRect().left;
		const yVal = e.pageY - frameRef.current.getBoundingClientRect().top;
		if (drawing.current && !drawn.current) {
			console.log("Move -> ", xVal, ", ", yVal);
			setEnd({ x: xVal, y: yVal });
		}
	};
	return (
		<div
			ref={frameRef}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				width: "100%",
				height: "100%",
				zIndex: 2,
			}}
			onClick={handleClick}
			// onMouseDown={handleDown}
			// onMouseUp={handleUp}
			onMouseMove={handleMove}
		>
			{drawing.current && !drawn.current && start && end && (
				<div style={resizeBy(start, end)} draggable />
			)}
		</div>
	);
}
