import { combineReducers } from "redux";
import CardsReducer from "./cards.reducer";
import AuthReducer from "./auth.reducer";

const rootReducer = combineReducers({
	cards: CardsReducer,
	auth: AuthReducer,
});

export default rootReducer;
