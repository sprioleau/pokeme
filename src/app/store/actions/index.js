import types from "../types";

import * as api from "../../api";

export const toggleModalVisibility = (modalContent) => ({
	type: types.TOGGLE_MODAL_VISIBILITY,
	modalContent: null ?? modalContent
});

// --- Thunks --- //
export const fetchCards = () => {
	return (dispatch) => api.fetchCardsFromApi((cards) => dispatch({
		type: types.FETCH_CARDS,
		cards,
	}));
};

// Create
export const createCard = (fields, history) => {
	return (dispatch) => api.createCardFromApi(fields, (newCard) => {
		dispatch({
			type: types.CREATE_CARD,
			newCard,
		});

		history.push(`/cards/${newCard.id}`);
	});
};

// Read
export const fetchCard = (id, callback) => {
	return (dispatch) => api.fetchCardFromApi(id, (card) => {
		dispatch({
			type: types.FETCH_CARD,
			card
		});

		callback(card);
	});
};

// Update
export const updateCard = (fields) => {
	return (dispatch) => api.updateCardFromApi(fields, (updatedCard) => dispatch({
		type: types.UPDATE_CARD,
		updatedCard
	}));
};

// Delete
export const deleteCard = (id, history) => {
	return (dispatch) => api.deleteCardFromApi(id, (data) => {
		dispatch({
			type: types.DELETE_CARD,
			message: data.message,
		});

		if (!data.message.includes("success")) return null;
		return history.push("/cards");
	});
};

export const generateCards = (quantity) => {
	if (quantity >= 50) return null;

	return (dispatch) => api.generateCards(quantity, (cards) => {
		dispatch({
			type: types.GENERATE_CARDS,
			cards
		});
	});
};
