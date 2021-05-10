import { toast } from "react-toastify";
import types from "../types";

import * as api from "../../api";

export const toggleModalVisibility = (modalContent) => ({
	type: types.TOGGLE_MODAL_VISIBILITY,
	modalContent: null ?? modalContent
});

export const setFilter = (type) => ({
	type: types.SET_FILTER,
	filter: type
});

// --- Thunks --- //
export const fetchCards = () => {
	return (dispatch) => {
		api.fetchCardsFromApi((cards) => dispatch({
			type: types.FETCH_CARDS,
			cards,
		}));
	};
};

// Create
export const createCard = (fields, history) => {
	return (dispatch) => api.createCardFromApi(fields, (newCard) => {
		dispatch({
			type: types.CREATE_CARD,
			newCard,
		});

		history.push({
			pathname: "/refresh",
			state: { id: newCard.id }
		});
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
export const updateCard = (id, fields, history) => {
	return (dispatch) => api.updateCardFromApi(id, fields, (updatedCard) => {
		dispatch({
			type: types.UPDATE_CARD,
			updatedCard
		});

		// Reference: https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
		history.push({
			pathname: "/refresh",
			state: { id }
		});
	});
};

// Delete
export const deleteCard = (id, history) => {
	return (dispatch) => api.deleteCardFromApi(id, (data) => {
		dispatch({
			type: types.DELETE_CARD,
			message: data.message,
			id
		});

		if (!data.message.includes("success")) return null;
		return history.push("/cards");
	});
};

export const deleteAllCards = (arrayOfIds, history) => {
	return (dispatch) => {
		arrayOfIds.forEach((id) => api.deleteCardFromApi(id, ({ message }) => {
			if (message.includes("success")) toast(`Deleted card with ID: ${id}`);
		}));

		dispatch({
			type: types.DELETE_ALL_CARDS,
			ids: arrayOfIds
		});

		return history.push("/cards");
	};
};

export const generateCards = (quantity, history) => {
	if (quantity >= 50) return null;

	return (dispatch) => api.generateCards(quantity, (cards) => {
		cards.forEach((cardData) => {
			api.createCardFromApi(cardData, (newCardInDatabase) => {
				dispatch({
					type: types.CREATE_CARD,
					newCard: newCardInDatabase
				});
			});
		});

		return history.push("/cards");
	});
};
