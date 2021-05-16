// Disabline ESLint for better legibility at a glance
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable comma-spacing */

const types = {
	FETCH_CARDS             : "cards/FETCH_CARDS"             ,
	CREATE_CARD             : "cards/CREATE_CARD"             , // Create
	FETCH_CARD              : "cards/FETCH_CARD"              , // Read
	UPDATE_CARD             : "cards/UPDATE_CARD"             , // Update
	DELETE_CARD             : "cards/DELETE_CARD"             , // Delete
	DELETE_ALL_CARDS        : "cards/DELETE_ALL_CARDS"        , // Delete
	TOGGLE_MODAL_VISIBILITY : "cards/TOGGLE_MODAL_VISIBILITY" ,
	SET_FILTER              : "cards/SET_FILTER"              ,
	SET_IS_LOADING          : "cards/SET_IS_LOADING"          ,
	AUTH_USER               : "auth/AUTH_USER"                ,
	DEAUTH_USER             : "auth/DEAUTH_USER"              ,
};

export default types;
