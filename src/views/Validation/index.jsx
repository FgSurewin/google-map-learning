import React from "react";
import Box from "../../components/Box";
import LabelTool from "../../components/LabelTool";
// import { URL, boxes } from "./asset";
import { v4 as uuidV4 } from "uuid";
import { Target } from "../../components/Box/utils";
import { useParams } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { fetchImage } from "../../api/images";
import { boxDecorator } from "./asset";

// import { useQuery, gql } from "@apollo/client";

export default function Validation() {
	const [box, setBox] = React.useState(null);
	const [url, setURL] = React.useState(null);
	const [type, setType] = React.useState(null);
	const [toggle, setToggle] = React.useState(false);
	const params = useParams();

	React.useEffect(() => {
		const listener = (ev) => {
			ev.preventDefault();
			console.log("Hello Test");
			return (ev.returnValue = "Are you sure you want to exit?");
		};
		window.addEventListener("beforeunload", listener);
		return () => {
			window.removeEventListener("beforeunload", listener);
		};
	}, []);

	// Redux
	const { images } = useSelector((state) => state.map, shallowEqual);

	React.useEffect(() => {
		async function loadFunction() {
			if (images.length > 0) {
				console.log("image from redux-> ", images);
				images.forEach((item) => {
					if (item._id === params.id) {
						setBox(boxDecorator(item.labeled_area));
						setURL(item.url);
					}
				});
			} else {
				const { data } = await fetchImage(params.id);
				console.log("image from DB-> ", data);
				setBox(boxDecorator(data.data.labeled_area));
				setURL(data.data.url);
			}
		}
		loadFunction();
		return () => {
			console.log("close pages");
		};
	}, [images, params]);

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
			{box === null ? (
				<h1>Loading....</h1>
			) : (
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
						src={url}
						alt="label"
						style={{
							width: "100%",
						}}
					/>
				</div>
			)}
		</div>
	);
}
