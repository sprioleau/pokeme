import types from "../types";

const initialState = {
	user: {},
	isAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTH_USER: {
			// const email = action.email ?? null;
			return {
				...state,
				isAuthenticated: true,
				user: action.user
			};
		}

		case types.DEAUTH_USER: {
			return {
				...state,
				isAuthenticated: false,
				user: {}
			};
		}

		default:
			return state;
	}
};

export default AuthReducer;
