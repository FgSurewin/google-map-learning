import { HANDLE_COMPLETED, HANDLE_MAP } from "../actionTypes";

const initialState = {
	pano: null,
	position: {
		lat: 0,
		lng: 0,
	},
	images: [],
	progress: 0,
};

function mapReducer(state = initialState, action) {
	switch (action.type) {
		// case SAVE_MAP_LIST:
		// 	const mapList = action.payload;
		// 	return {
		// 		...state,
		// 		images: [...mapList],
		// 	};
		case HANDLE_MAP:
			const list = action.payload;
			// const imagesId = list && list.map((item) => item._id);
			return {
				pano: list[0].pano,
				position: {
					...state.position,
					lat: list[0].lat,
					lng: list[0].lon,
					heading: list[0].yaw,
				},
				images: [...list].map((item) =>
					Object.assign(item, { completed: false })
				),
			};

		case HANDLE_COMPLETED:
			const id = action.payload;
			return {
				...state,
				progress: state.progress + 10,
				images: [...state.images].map((item) => {
					if (item._id === id) item.completed = true;
					return item;
				}),
			};

		// case HANDLE_PANO:
		// 	const result = action.payload;
		// 	return {
		// 		...state,
		// 		pano: result,
		// 	};
		default:
			return state;
	}
}
export default mapReducer;
