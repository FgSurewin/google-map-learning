import React from "react";
import "./style.scss";
import { RATIO } from "../../views/Validation/asset";
import { Target, getColor } from "./utils";

export default function Box({
	startPoint,
	endPoint,
	target,
	isClick,
	BoxClick,
	BoxDelete,
}) {
	const promptClass = target === Target.KNOB ? "prompt top" : "prompt middle";

	return (
		<div
			className="Box"
			style={{
				position: "absolute",
				left: RATIO * startPoint.x,
				top: RATIO * startPoint.y,
				width: RATIO * (endPoint.x - startPoint.x),
				height: RATIO * (endPoint.y - startPoint.y),
				border: `4px solid ${getColor(target)}`,
				zIndex: target === Target.KNOB ? 10 : 5,
			}}
			onClick={BoxClick}
		>
			<h3 className={promptClass}>{target}</h3>
			{isClick && (
				<button className="delete" onClick={BoxDelete}>
					X
				</button>
			)}
		</div>
	);
}
