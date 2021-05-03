import types from "../types";

import * as api from "../../api";

// --- Thunks --- //
export const fetchPosts = () => {
	return (dispatch) => api.fetchPosts((posts) => dispatch({
		type: types.FETCH_POSTS,
		posts,
	}));
};

// Create
export const createPost = (fields, history) => {
	return (dispatch) => api.createPost(fields, (newPost) => {
		dispatch({
			type: types.CREATE_POST,
			newPost,
		});

		history.push(`/posts/${newPost.id}`);
	});
};

// Read
export const fetchPost = (id) => {
	return (dispatch) => api.fetchPost(id, (post) => dispatch({
		type: types.FETCH_POST,
		post
	}));
};

// Update
export const updatePost = (fields) => {
	return (dispatch) => api.updatePost(fields, (updatedPost) => dispatch({
		type: types.UPDATE_POST,
		updatedPost
	}));
};

// Delete
export const deletePost = (id, history) => {
	return (dispatch) => api.deletePost(id, (data) => {
		dispatch({
			type: types.DELETE_POST,
			message: data.message,
		});

		history.push("/posts");
	});
};
