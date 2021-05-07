import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/style.scss";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import NewCard from "./components/NewCard";
import Error404 from "./components/Error404";
import { selectModalContentExists } from "./store/selectors";
import Banner from "./components/Banner";
import Modal from "./components/Modal";
import Cards from "./components/Cards";
import Card from "./components/Card";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
	const modalContentExists = useSelector(selectModalContentExists);

	return (
		<div className="app">
			<Router>
				<Nav />
				{modalContentExists && <Modal />}
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					pauseOnHover={false}
					pauseOnFocusLoss
					rtl={false}
					draggable
				/>
				<Banner />
				<Switch>
					<Route exact path={["/", "/cards"]} component={Cards} />
					<Route path="/cards/new" component={NewCard} />
					<Route path="/cards/:cardId" component={Card} />
					<Route component={Error404} />
				</Switch>

			</Router>
		</div>
	);
};

export default App;
