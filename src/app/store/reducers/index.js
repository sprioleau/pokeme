import { combineReducers } from "redux";
import PostsReducer from "./posts.reducer";
import CardsReducer from "./cards.reducer";

const rootReducer = combineReducers({
	posts: PostsReducer,
	cards: CardsReducer,
});

export default rootReducer;
