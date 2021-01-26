import { HANDLE_MAP, HANDLE_PANO } from "../actionTypes";

const initialState = {
	pano: null,
	position: {
		lat: 0,
		lng: 0,
	},
	images: [],
};

function mapReducer(state = initialState, action) {
	switch (action.type) {
		case HANDLE_MAP:
			const list = action.payload;
			return {
				pano: list[0].pano,
				position: {
					...state.position,
					lat: list[0].lat,
					lng: list[0].lon,
				},
				images: [...list],
			};

		case HANDLE_PANO:
			const result = action.payload;
			return {
				...state,
				pano: result,
			};
		default:
			return state;
	}
}
export default mapReducer;
