import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { generateMapOption, generateStreetOption } from "../StreetView/utils";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { HANDLE_MAP } from "../../redux/actionTypes";
import { fetchRandomList } from "../../api/images";
import Navbar from "../../components/Navbar";
import { ExplorationContainer, ExplorationWrapper, NextButton } from "./style";
// import Background from "../../images/Group1.png";

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
	const { pano, position, images } = useSelector(
		(state) => state.map,
		shallowEqual
	);
	const dispatch = useDispatch();
	// console.log("position -> ", position);
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
					<div>
						{images &&
							images.map(({ _id }, index) => (
								<div key={_id}>
									<span>Image - {index}</span>
									<button
										style={{
											marginLeft: "20px",
										}}
										onClick={() => {
											history.push(`/validation/${_id}`);
										}}
									>
										GO
									</button>
								</div>
							))}
						<NextButton
							onClick={async () => {
								const { data } = await fetchRandomList();
								dispatch({ type: HANDLE_MAP, payload: data.data });
							}}
						>
							NEXT
						</NextButton>
					</div>
				</ExplorationContainer>
			)}
		</ExplorationWrapper>
	);
};

export default Exploration;
