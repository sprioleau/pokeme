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

export const setIsLoading = (isLoading) => ({
	type: types.SET_IS_LOADING,
	isLoading
});

// --- Thunks --- //
export const fetchCards = () => {
	return (dispatch) => {
		dispatch(setIsLoading(true));

		api.fetchCardsFromApi((cards) => {
			dispatch({
				type: types.FETCH_CARDS,
				cards,
			});
		});

		dispatch(setIsLoading(false));
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
			state: { id: updatedCard.id }
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

		if (!data.message.toLowerCase().includes("success")) return null;
		return history.push("/cards");
	});
};

export const deleteAllCards = (arrayOfIds, history) => {
	return (dispatch) => {
		arrayOfIds.forEach((id) => api.deleteCardFromApi(id, ({ message }) => {
			if (message.toLowerCase().includes("success")) {
				toast(`Deleted card with ID: ${id}`);
				dispatch({
					type: types.DELETE_CARD,
					message,
					id
				});
			}
		}));

		return history.push("/cards");
	};
};

export const generateCards = (quantity, history) => {
	if (quantity >= 50) return null;

	return (dispatch) => api.generateCardsFromApi(quantity, (cards) => {
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

export const signUpUser = ({ email, password, authorName }, history) => {
	console.log("{ email, password, authorName }:", { email, password, authorName });
	return (dispatch) => api.signUpUserFromApi({ email, password, authorName }, (user) => {
		dispatch({
			type: types.AUTH_USER,
			user
		});

		localStorage.setItem("token", user.token);
		return history.push("/");
	});
};

export const signInUser = ({ email, password }, history) => {
	return (dispatch) => api.signInUserFromApi({ email, password }, (user) => {
		dispatch({
			type: types.AUTH_USER,
			user
		});

		localStorage.setItem("token", user.token);
		return history.push("/");
	});
};

export const signOutUser = (history) => {
  return (dispatch) => {
		dispatch({ type: types.DEAUTH_USER });
    localStorage.removeItem("token");
    history.push("/");
  };
};
