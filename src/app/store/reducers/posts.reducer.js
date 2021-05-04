import types from "../types";

const initialState = {
	posts: [],
	currentPost: {},
	message: "",
	modalContent: null,
};

const PostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_POSTS: {
			return {
				...state,
				posts: action.posts,
			};
		}

		// Create
		case types.CREATE_POST: {
			return {
				...state,
				// posts: [...state.posts, action.newPost],
			};
		}

		// Read
		case types.FETCH_POST: {
			return {
				...state,
				currentPost: action.post
			};
		}

		// Update
		case types.UPDATE_POST: {
			return {
				...state,
				posts: [...state.posts, action.updatedPost],
				currentPost: action.updatedPost
			};
		}

		// Delete
		case types.DELETE_POST: {
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

		default:
			return state;
	}
};

export default PostsReducer;
