import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/style.scss";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import NewCard from "./components/NewCard";
import Error404 from "./components/Error404";
// import { selectModalContentExists } from "./store/selectors";
import { selectCards, selectMessage, selectModalContentExists } from "./store/selectors";
// import Banner from "./components/Banner";
import Modal from "./components/Modal";
import Cards from "./components/Cards";
import Card from "./components/Card";
import { dropAllEntriesFromApi } from "./api";

const App = () => {
	const message = useSelector(selectMessage);
	const cards = useSelector(selectCards);
	const modalContentExists = useSelector(selectModalContentExists);

	return (
		<div className="app">
			<Router>
				<Nav />
				<div className="message">{message}</div>
				<button type="button" onClick={() => dropAllEntriesFromApi(cards.map(({ id }) => id))}>
					Drop all entries
				</button>
				{modalContentExists && <Modal />}
				{/* <Banner /> */}
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
