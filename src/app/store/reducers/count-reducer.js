import types from "../types";

const initialState = 0;

const CountReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.INCREMENT:
			return state + 1;
		case types.DECREMENT:
			return state - 1;
		default:
			return state;
	}
};

export default CountReducer;
