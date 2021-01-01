import React from "react";
import Box from "../../components/Box";
import { URL } from "./asset";

const boxes = [
	{
		startPoint: {
			x: 2077.0,
			y: 13.0,
		},
		endPoint: {
			x: 2794.0,
			y: 1203.0,
		},
	},
];

export default function Validation() {
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
					boxes.map(({ startPoint, endPoint }) => (
						<Box startPoint={startPoint} endPoint={endPoint} />
					))}
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
