import types from "../types";

const initialState = {
	cards: [],
	currentCard: {},
	message: "",
	modalContent: null,
};

const CardsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_CARDS: {
			return {
				...state,
				cards: action.cards,
			};
		}

		// Create
		case types.CREATE_CARD: {
			return {
				...state,
				cards: [...state.cards, action.newCards],
			};
		}

		// Read
		case types.FETCH_CARD: {
			return {
				...state,
				currentCard: action.card
			};
		}

		// Update
		case types.UPDATE_CARD: {
			return {
				...state,
				cards: [...state.cards, action.updatedCard],
				currentCard: action.updatedCard
			};
		}

		// Delete
		case types.DELETE_CARD: {
			return {
				...state,
				message: action.message
			};
		}

		case types.TOGGLE_MODAL_VISIBILITY: {
			return {
				...state,
				modalContent: action.modalContent
			};
		}

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
