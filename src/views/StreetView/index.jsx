import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { v4 as uuidV4 } from "uuid";
import { debounce, isEqual } from "./utils";
import {
	generateBorderStyle,
	colors,
	// display,
	resetLabels,
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
		heading: 0,
		pitch: 0,
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
	const size = React.useRef(0);

	const replaceLabels = () => {
		// console.log("测试", locationInfo.current);
		if (
			labels.length === size.current &&
			size.current !== 0 &&
			!isEqual(labels[0].pov, locationInfo.current.pov)
		) {
			console.log("不相等");
			const result = resetLabels(labels, locationInfo.current);
			if (result) {
				console.log("重新设置");
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
		// console.log("test -> ", labels);
		locationInfo.current = e;
		map.setCenter(locationInfo.current.position);
		console.log("Position -> Info: ", locationInfo.current);
	};
	console.log("FATHER: ", labels);
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
