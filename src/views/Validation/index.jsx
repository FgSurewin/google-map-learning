import React from "react";
import Box from "../../components/Box";
import LabelTool from "../../components/LabelTool";
import { URL, boxes } from "./asset";
import { v4 as uuidV4 } from "uuid";
import { Target } from "../../components/Box/utils";

// import { useQuery, gql } from "@apollo/client";

export default function Validation() {
	const [box, setBox] = React.useState(() => boxes);
	const [type, setType] = React.useState(null);
	const [toggle, setToggle] = React.useState(false);

	React.useEffect(() => {
		return () => {
			console.log("close pages");
		};
	}, []);

	const finish = (start, end, target) => {
		setBox([
			...box,
			{
				id: uuidV4(),
				isClick: false,
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

	const clearClick = () => {
		setBox((c) =>
			c.map((item) => {
				item.isClick = false;
				return item;
			})
		);
	};

	const BoxClick = (id) => () => {
		clearClick();
		setBox((c) =>
			c.map((item) => {
				if (item.id === id) {
					item.isClick = true;
				}
				return item;
			})
		);
	};

	const BoxDelete = (id) => () => {
		setBox((c) => c.filter((item) => item.id !== id));
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
					box.map(({ id, startPoint, endPoint, target, isClick }) => (
						<Box
							key={id}
							startPoint={startPoint}
							endPoint={endPoint}
							target={target}
							BoxClick={BoxClick(id)}
							BoxDelete={BoxDelete(id)}
							isClick={isClick}
						/>
					))}
				<LabelTool
					finish={finish}
					type={type}
					toggle={toggle}
					clearClick={clearClick}
				/>
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
