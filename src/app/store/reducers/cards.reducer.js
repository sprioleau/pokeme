import types from "../types";

const initialState = {
	cards: [],
	currentCard: {},
	message: "",
	modalContent: {},
};

const CardsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_CARDS: {
			return {
				...state,
				cards: action.cards,
				currentCard: {}
			};
		}

		// Create
		case types.CREATE_CARD: {
			return {
				...state,
				cards: [...state.cards, action.newCard],
				modalContent: {},
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
				currentCard: action.updatedCard,
				modalContent: {},
			};
		}

		// Delete
		case types.DELETE_CARD: {
			return {
				...state,
				cards: [...state.cards.filter((card) => card.id === action.id)],
				message: action.message
			};
		}

		case types.DELETE_ALL_CARDS: {
			return {
				...state,
				cards: [],
			};
		}

		case types.TOGGLE_MODAL_VISIBILITY: {
			return {
				...state,
				modalContent: action.modalContent
			};
		}

		default:
			return state;
	}
};

export default CardsReducer;
