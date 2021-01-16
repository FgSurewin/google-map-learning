import React from "react";
import Box from "../../components/Box";
import LabelTool from "../../components/LabelTool";
import { URL, boxes } from "./asset";
import { v4 as uuidV4 } from "uuid";
import { Target } from "../../components/Box/utils";

export default function Validation() {
	const [box, setBox] = React.useState(boxes);
	const [type, setType] = React.useState(null);
	const [toggle, setToggle] = React.useState(false);
	const finish = (start, end, target) => {
		console.log("FINISH -> ", box);
		setBox([
			...box,
			{
				id: uuidV4(),
				target,
				startPoint: start,
				endPoint: end,
			},
		]);
		setToggle(false);
	};

	const handleType = (type) => () => {
		setType(type);
		setToggle(true);
	};

	return (
		<div>
			<h1>Validation</h1>
			<div>
				<button>back</button>
				<button onClick={handleType(Target.DOOR)}>door</button>
				<button onClick={handleType(Target.RAMP)}>ramp</button>
				<button onClick={handleType(Target.KNOB)}>knob</button>
				<button onClick={handleType(Target.STAIRS)}>stairs</button>
				<button onClick={() => setToggle(false)}>cancel</button>
			</div>
			<div
				style={{
					width: "800px",
					position: "relative",
				}}
			>
				{box &&
					box.length > 0 &&
					box.map(({ id, startPoint, endPoint, target }) => (
						<Box
							key={id}
							startPoint={startPoint}
							endPoint={endPoint}
							target={target}
						/>
					))}
				<LabelTool finish={finish} type={type} toggle={toggle} />
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
