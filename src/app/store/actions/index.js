import types from "../types";

import * as api from "../../api";

export const toggleModalVisibility = (modalContent) => ({
	type: types.TOGGLE_MODAL_VISIBILITY,
	modalContent: null ?? modalContent
});

// --- Thunks --- //
export const fetchPosts = () => {
	return (dispatch) => api.fetchPostsFromApi((posts) => dispatch({
		type: types.FETCH_POSTS,
		posts,
	}));
};

// Create
export const createPost = (fields, history) => {
	return (dispatch) => api.createPostFromApi(fields, (newPost) => {
		dispatch({
			type: types.CREATE_POST,
			newPost,
		});

		history.push(`/posts/${newPost.id}`);
	});
};

// Read
export const fetchPost = (id, callback) => {
	return (dispatch) => api.fetchPostFromApi(id, (post) => {
		dispatch({
			type: types.FETCH_POST,
			post
		});

		callback(post);
	});
};

// Update
export const updatePost = (fields) => {
	return (dispatch) => api.updatePostFromApi(fields, (updatedPost) => dispatch({
		type: types.UPDATE_POST,
		updatedPost
	}));
};

// Delete
export const deletePost = (id, history) => {
	return (dispatch) => api.deletePostFromApi(id, (data) => {
		dispatch({
			type: types.DELETE_POST,
			message: data.message,
		});

		history.push("/posts");
	});
};

// Delete Card
export const deleteCard = (id, history) => {
	return (dispatch) => api.deleteCardFromApi(id, (data) => {
		dispatch({
			type: types.DELETE_POST,
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
