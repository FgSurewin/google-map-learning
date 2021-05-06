import React from "react";
import Box from "../../components/Box";
import LabelTool from "../../components/LabelTool";
// import { URL, boxes } from "./asset";
import { v4 as uuidV4 } from "uuid";
import { getColor, Target } from "../../components/Box/utils";
import { useParams, useHistory } from "react-router-dom";
// import { useSelector, shallowEqual } from "react-redux";
import { addLabeledArea, fetchImage, fetchToggle } from "../../api/images";
import { boxDecorator, boxReverser } from "./asset";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import {
	ValidationButtonGroup,
	ValidationWrapper,
	ValidationButton,
	ValidationGroup,
} from "./style";
import { HANDLE_COMPLETED } from "../../redux/actionTypes";

// import { useQuery, gql } from "@apollo/client";

export default function Validation() {
	const [box, setBox] = React.useState(null);
	const [url, setURL] = React.useState(null);
	const [type, setType] = React.useState(null);
	const [toggle, setToggle] = React.useState(false);
	const params = useParams();
	const history = useHistory();

	// Get warning when the user close the page
	React.useEffect(() => {
		const listener = async (ev) => {
			ev.preventDefault();
			const result = await fetchToggle({ labeled: false, id: params.id });
			console.log("result -> ", result);
			return (ev.returnValue = "Are you sure you want to exit?");
		};
		window.addEventListener("beforeunload", listener);
		return () => {
			window.removeEventListener("beforeunload", listener);
		};
	}, [params]);

	// Redux
	const dispatch = useDispatch();

	React.useEffect(() => {
		async function loadFunction() {
			// if (images.length > 0) {
			// 	console.log("image from redux-> ", images);
			// 	images.forEach((item) => {
			// 		if (item._id === params.id) {
			// 			setBox(boxDecorator(item.labeled_area));
			// 			setURL(item.url);
			// 		}
			// 	});
			// } else {
			// 	const { data } = await fetchImage(params.id);
			// 	console.log("image from DB-> ", data);
			// 	setBox(boxDecorator(data.data.labeled_area));
			// 	setURL(data.data.url);
			// }
			const { data } = await fetchImage(params.id);
			console.log("image from DB-> ", data);
			setBox(boxDecorator(data.data.labeled_area));
			setURL(data.data.url);
		}
		loadFunction();
		return async () => {
			await fetchToggle({ labeled: false, id: params.id });
			console.log("close pages");
		};
	}, [params]);

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
		<ValidationWrapper>
			<Navbar primary="white" isStatic={true} isFixed={true} />
			<ValidationButtonGroup>
				<ValidationGroup>
					<ValidationButton
						btn={getColor(Target.DOOR)}
						onClick={handleType(Target.DOOR)}
					>
						door
					</ValidationButton>
					<ValidationButton
						btn={getColor(Target.RAMP)}
						ml={63}
						onClick={handleType(Target.RAMP)}
					>
						ramp
					</ValidationButton>
				</ValidationGroup>
				<ValidationGroup>
					<ValidationButton
						btn={getColor(Target.KNOB)}
						onClick={handleType(Target.KNOB)}
					>
						knob
					</ValidationButton>
					<ValidationButton
						btn={getColor(Target.STAIRS)}
						ml={68}
						onClick={handleType(Target.STAIRS)}
					>
						stairs
					</ValidationButton>
				</ValidationGroup>
				<ValidationGroup>
					<ValidationButton
						onClick={async () => {
							const result = await fetchToggle({
								labeled: false,
								id: params.id,
							});
							console.log("TOGGLE -> ", result);
							history.push("/streetView");
						}}
					>
						back
					</ValidationButton>
					<ValidationButton ml={68} onClick={() => setToggle(false)}>
						cancel
					</ValidationButton>
				</ValidationGroup>
				<ValidationButton
					btn="#3f3d56"
					onClick={async () => {
						const result = await addLabeledArea({
							id: params.id,
							labelArea: boxReverser(box),
						});
						console.log("addLabeledArea -> ", result);
						dispatch({ type: HANDLE_COMPLETED, payload: params.id });
						await fetchToggle({ labeled: false, id: params.id });
						history.push("/streetView");
					}}
				>
					SUBMIT
				</ValidationButton>
			</ValidationButtonGroup>
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
		</ValidationWrapper>
	);
}
