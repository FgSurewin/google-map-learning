import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { v4 as uuidV4 } from "uuid";
import {
	debounce,
	generateMapOption,
	generateStreetOption,
	isEqual,
} from "./utils";
import { generateBorderStyle, colors, resetLabels } from "./utils/labelTools";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { HANDLE_MAP } from "../../redux/actionTypes";
import { fetchRandomList } from "../../api/images";

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
const StreetViewRest = () => {
	const [labelColor, setLabelColor] = React.useState(colors.default);
	const [labelMode, setLabelMode] = React.useState(false);
	const [labels, setLabels] = React.useState([]);
	const [markers, setMarkers] = React.useState([]);
	const locationInfo = React.useRef(defaultInfo);
	const size = React.useRef(0);

	// Router
	const history = useHistory();

	// Redux
	const { pano, position, images } = useSelector(
		(state) => state.map,
		shallowEqual
	);
	// console.log("position -> ", position);
	const _mount = React.useRef(pano);

	const dispatch = useDispatch();
	React.useEffect(() => {
		async function fetchData() {
			const { data } = await fetchRandomList();
			dispatch({ type: HANDLE_MAP, payload: data.data });
		}
		if (!_mount.current) fetchData();
	}, [dispatch]);

	const replaceLabels = () => {
		if (
			labels.length === size.current &&
			size.current !== 0 &&
			!isEqual(labels[0].pov, locationInfo.current.pov)
		) {
			const result = resetLabels(labels, locationInfo.current);
			if (result) {
				setLabels(result);
			}
		}
	};
	const replaceLabelsWithDebounce = debounce(replaceLabels, 400);
	const onPovChanged = (e) => {
		locationInfo.current = e;
		// console.log("POV -> Info: ", locationInfo.current);
		// console.log("测试");
		replaceLabelsWithDebounce();
	};

	const onZoomChanged = (e) => {
		// console.log("ZOOM: ", e);
		locationInfo.current = e;
		// console.log("ZOOM -> Info: ", locationInfo.current);
	};

	const onPositionChanged = (e, map) => {
		// console.log("Position -> ", e);
		locationInfo.current = e;
		map.setCenter(locationInfo.current.position);
		// console.log("Position -> Info: ", locationInfo.current);
	};
	// console.log("FATHER: ", labels);
	const handleStreetViewClick = (e) => {
		if (labelMode) {
			setLabels([
				...labels,
				{
					id: uuidV4(),
					position: {
						x: e.nativeEvent.offsetX,
						y: e.nativeEvent.offsetY,
					},
					color: labelColor,
					// display: display.show,
					pov: locationInfo.current.pov,
				},
			]);
			size.current++;
			setMarkers([
				...markers,
				{
					id: uuidV4(),
					markerOptions: {
						position: {
							lat: locationInfo.current.position.lat,
							lng: locationInfo.current.position.lng,
						},
					},
				},
			]);
			setLabelMode(false);
			setLabelColor(colors.default);
		}
	};

	return (
		<div>
			<button
				onClick={() => {
					setLabelColor(colors.success);
					setLabelMode(true);
				}}
				disabled
			>
				Add Point
			</button>
			<button
				onClick={() => {
					setLabelMode(!labelMode);
					labelColor === colors.default
						? setLabelColor(colors.success)
						: setLabelColor(colors.default);
				}}
			>
				Change Mode
			</button>
			<button
				onClick={async () => {
					const { data } = await fetchRandomList();
					dispatch({ type: HANDLE_MAP, payload: data.data });
				}}
			>
				NEXT
			</button>
			{pano && (
				<div
					style={{
						display: "flex",
					}}
				>
					<OriginalMap
						api={process.env.REACT_APP_API_KEY}
						mainStyle={generateBorderStyle(labelColor)}
						streetViewOptions={generateStreetOption(
							position.lat,
							position.lng,
							position.heading
						)}
						// streetViewOptions={streetViewOptions}
						mapOptions={generateMapOption(position.lat, position.lng)}
						// mapOptions={mapOptions}
						events={{
							onPovChanged,
							onZoomChanged,
							onPositionChanged,
						}}
						markers={markers}
						labels={labels}
						labelMode={labelMode}
						handleStreetViewClick={handleStreetViewClick}
					/>
					<div
						style={{
							transform: "translate(-100%, 0)",
						}}
					>
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
					</div>
				</div>
			)}
		</div>
	);
};

export default StreetViewRest;
