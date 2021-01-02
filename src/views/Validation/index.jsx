import React from "react";
import Box from "../../components/Box";
import LabelTool from "../../components/LabelTool";
import { URL, boxes } from "./asset";

export default function Validation() {
	// React.useEffect(() => {
	// 	console.log("canvasRef -> ", canvasRef);
	// 	const myRect = canvasRef.current.getContext("2d");
	// 	myRect.beginPath();
	// 	myRect.lineWidth = "4";
	// 	myRect.strokeStyle = "green";
	// 	myRect.rect(30, 30, 100, 100);
	// 	myRect.stroke();
	// });
	return (
		<div>
			<h1>Validation</h1>
			<div
				style={{
					width: "800px",
					position: "relative",
				}}
			>
				{boxes &&
					boxes.length > 0 &&
					boxes.map(({ startPoint, endPoint, target }, index) => (
						<Box
							key={index + target}
							startPoint={startPoint}
							endPoint={endPoint}
							target={target}
						/>
					))}
				<LabelTool />
				<img
					src={URL}
					alt="label"
					style={{
						width: "100%",
					}}
				/>
			</div>
		</div>
	);
}
