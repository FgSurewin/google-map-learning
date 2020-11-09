export const defaultMapOptions = {
	mapTypeControlOptions: {
		mapTypeIds: [],
	},
	zoomControl: false,
	fullscreenControl: false,
	panControl: true,
	// streetViewControl: false,
	// disableDefaultUI: true,
};

export const combineMapOptions = (options) =>
	Object.assign({}, options, defaultMapOptions);
