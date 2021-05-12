import types from "../types";

const initialState = {
	cards: [],
	currentCard: {},
	modalContent: {},
	filter: "",
	isLoading: false,
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
				cards: [...state.cards.filter((card) => card._id === action.id)],
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

		case types.SET_FILTER: {
			return {
				...state,
				filter: action.filter
			};
		}

		case types.SET_IS_LOADING: {
			return {
				...state,
				loading: action.isLoading
			};
		}

		default:
			return state;
	}
};

export default CardsReducer;
