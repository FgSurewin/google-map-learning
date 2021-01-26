import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { v4 as uuidV4 } from "uuid";
import {
	debounce,
	generateMapOption,
	generateStreetOption,
	isEqual,
} from "./utils";
import {
	generateBorderStyle,
	colors,
	// display,
	resetLabels,
} from "./utils/labelTools";
import { useLazyQuery } from "@apollo/client";
import { QUERY_RANDOM_IMAGE_LIST } from "../../graphql/image/query";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { HANDLE_MAP } from "../../redux/actionTypes";

// const mapOptions = {
// 	center: {
// 		lat: 40.701116,
// 		lng: -73.957748,
// 	},
// 	zoom: 18,
// };

// const streetViewOptions = {
// 	position: {
// 		lat: 40.701116,
// 		lng: -73.957748,
// 	},
// 	pov: {
// 		heading: 230,
// 		pitch: 0,
// 	},
// };

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
	// const [next, setNext] = React.useState(true);
	const locationInfo = React.useRef(defaultInfo);
	const size = React.useRef(0);
	const _mount = React.useRef(false);

	// Redux
	const { pano, position } = useSelector((state) => state.map, shallowEqual);
	const _next = React.useRef(pano ? true : false);
	const dispatch = useDispatch();

	// const { loading, error, data } = useQuery(GET_DOGS);
	// const { data, refetch, loading } = useQuery(QUERY_RANDOM_IMAGE_LIST, {
	// 	fetchPolicy: "no-cache",
	// });
	const [loadData, { data }] = useLazyQuery(QUERY_RANDOM_IMAGE_LIST, {
		fetchPolicy: "no-cache",
	});

	React.useEffect(() => {
		console.log("data ->", data);
		if (!data && !_mount.current) {
			console.log("Load data...");
			_mount.current = true;
			loadData();
		}
		if (data && !_next.current) {
			console.log("Set Data");
			// dispatch({ type: HANDLE_PANO, payload: null })
			dispatch({ type: HANDLE_MAP, payload: data.getRandomImageList });
			_next.current = true;
			// setNext(false);
		}
		// setNext(false);
	}, [data, dispatch, loadData]);

	const replaceLabels = () => {
		if (
			labels.length === size.current &&
			size.current !== 0 &&
			!isEqual(labels[0].pov, locationInfo.current.pov)
		) {
			// console.log("不相等");
			const result = resetLabels(labels, locationInfo.current);
			if (result) {
				// console.log("重新设置");
				setLabels(result);
			}
		}
	};
	const replaceLabelsWithDebounce = debounce(replaceLabels, 400);
	const onPovChanged = (e) => {
		locationInfo.current = e;
		console.log("POV -> Info: ", locationInfo.current);
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

	// if (loading) return <div>loading....</div>;
	// if (next) return <div>MyLoading....</div>;
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
				onClick={() => {
					console.log("--------NEXT BUTTON-----------");
					loadData();
					_next.current = false;
					// setNext(!next)
					// props.history.push("/test");
				}}
			>
				NEXT
			</button>
			{pano && (
				<OriginalMap
					api={process.env.REACT_APP_API_KEY}
					mainStyle={generateBorderStyle(labelColor)}
					streetViewOptions={generateStreetOption(position.lat, position.lng)}
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
			)}
		</div>
	);
};

export default StreetView;
