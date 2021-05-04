import types from "../types";

const initialState = {
	cards: [],
};

const CardsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GENERATE_CARDS: {
			return {
				...state,
				cards: action.cards,
			};
		}

		default:
			return state;
	}
};

export default CardsReducer;
