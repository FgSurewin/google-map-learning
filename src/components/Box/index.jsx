import React from "react";
import "./style.scss";
import { RATIO } from "../../views/Validation/asset";

export default function Box({ startPoint, endPoint }) {
	return (
		<div
			className="Box"
			style={{
				position: "absolute",
				left: RATIO * startPoint.x,
				width: RATIO * (endPoint.x - startPoint.x),
				height: RATIO * (endPoint.y - startPoint.y),
				border: "2px solid green",
			}}
		></div>
	);
}
