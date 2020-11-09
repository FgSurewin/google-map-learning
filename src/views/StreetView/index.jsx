import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { v4 as uuidV4 } from "uuid";
import {
	generateBorderStyle,
	colors,
	generateLabelStyle,
} from "./utils/labelTools";

const mapOptions = {
	center: {
		lat: 40.7541,
		lng: -73.99208,
	},
	zoom: 18,
};

const streetViewOptions = {
	position: {
		lat: 40.7541,
		lng: -73.99208,
	},
	pov: {
		heading: 34,
		pitch: 10,
	},
};

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

const StreetView = () => {
	const [labelColor, setLabelColor] = React.useState(colors.default);
	const [labelMode, setLabelMode] = React.useState(false);
	const [labels, setLabels] = React.useState([]);
	const [markers, setMarkers] = React.useState([]);
	const locationInfo = React.useRef(defaultInfo);

	const onPovChanged = (e) => {
		locationInfo.current = e;
	};

	const onZoomChanged = (e) => {
		console.log("ZOOM: ", e);
		locationInfo.current = e;
		console.log("ZOOM -> Info: ", locationInfo.current);
	};

	const onPositionChanged = (e, map) => {
		console.log("Position: ", map);
		locationInfo.current = e;
		map.setCenter(locationInfo.current.position);
		console.log("Position -> Info: ", locationInfo.current);
	};

	const handleStreetViewClick = (e) => {
		if (labelMode) {
			setLabels([
				...labels,
				{
					id: uuidV4(),
					style: generateLabelStyle(
						e.nativeEvent.offsetX,
						e.nativeEvent.offsetY,
						labelColor
					),
				},
			]);
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
			<OriginalMap
				api={process.env.REACT_APP_API_KEY}
				mainStyle={generateBorderStyle(labelColor)}
				streetViewOptions={streetViewOptions}
				mapOptions={mapOptions}
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
		</div>
	);
};

export default StreetView;
