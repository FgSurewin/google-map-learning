import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import CircularProgress from "@material-ui/core/CircularProgress";

const containerStyle = {
	width: "400px",
	height: "400px",
};

const BasicMap = ({ center, api }) => {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: api,
	});

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>;
	}

	return (
		<div>
			{isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={10}
				></GoogleMap>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default BasicMap;
