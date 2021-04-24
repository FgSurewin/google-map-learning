import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { generateMapOption, generateStreetOption } from "../StreetView/utils";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { HANDLE_MAP } from "../../redux/actionTypes";
import { fetchRandomList } from "../../api/images";
import Navbar from "../../components/Navbar";
import {
	ExplorationContainer,
	ExplorationCover,
	ExplorationPanel,
	ExplorationShowcase,
	ExplorationWrapper,
	NextButton,
	ShowcaseButton,
	ShowcaseText,
} from "./style";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

const defaultInfo = {
	pano: "",
	position: {
		lat: 40.7541,
		lng: -73.99208,
	},
	pov: {
		heading: 34,
		pitch: 10,
		zoom: 1,
	},
};
const Exploration = () => {
	const locationInfo = React.useRef(defaultInfo);

	// Router
	const history = useHistory();

	// Redux
	const { pano, position, images, progress } = useSelector(
		(state) => state.map,
		shallowEqual
	);
	const dispatch = useDispatch();
	console.log("progress -> ", progress);
	const _mount = React.useRef(pano);

	React.useEffect(() => {
		async function fetchData() {
			const { data } = await fetchRandomList();
			dispatch({ type: HANDLE_MAP, payload: data.data });
		}
		if (!_mount.current) fetchData();
	}, [dispatch]);

	const onPositionChanged = (e, map) => {
		locationInfo.current = e;
		map.setCenter(locationInfo.current.position);
	};

	return (
		<ExplorationWrapper>
			<Navbar primary="white" isStatic={true} isFixed={true} />
			{pano && (
				<ExplorationContainer>
					<OriginalMap
						api={process.env.REACT_APP_API_KEY}
						streetViewOptions={generateStreetOption(
							position.lat,
							position.lng,
							position.heading
						)}
						mapOptions={generateMapOption(position.lat, position.lng)}
						events={{ onPositionChanged }}
					/>
					<ExplorationPanel>
						<ExplorationCover>
							<LinearProgressWithLabel
								value={parseInt(progress)}
								variant="determinate"
							/>
							{images &&
								images.map(({ _id, completed }, index) => (
									<ExplorationShowcase key={_id}>
										<ShowcaseText finished={completed.toString()}>
											Image - {index}
										</ShowcaseText>
										<ShowcaseButton
											finished={completed.toString()}
											onClick={() => {
												history.push(`/validation/${_id}`);
											}}
										>
											{completed ? "completed" : "view"}
										</ShowcaseButton>
									</ExplorationShowcase>
								))}
						</ExplorationCover>
						<NextButton
							onClick={async () => {
								const { data } = await fetchRandomList();
								dispatch({ type: HANDLE_MAP, payload: data.data });
							}}
						>
							NEXT
						</NextButton>
					</ExplorationPanel>
				</ExplorationContainer>
			)}
		</ExplorationWrapper>
	);
};

export default Exploration;
