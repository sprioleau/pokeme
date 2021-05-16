import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";

import App from "./app/App";
import types from "./app/store/types/index";

const token = localStorage.getItem("token");
if (token) store.dispatch({ type: types.AUTH_USER });

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("main")
);
