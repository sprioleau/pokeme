import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/style.scss";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import Error404 from "./components/Error404";
import { selectMessage, selectModalContentExists } from "./store/selectors";
import Banner from "./components/Banner";
import Modal from "./components/Modal";
import Cards from "./components/Cards";

const App = () => {
	const message = useSelector(selectMessage);
	const modalContentExists = useSelector(selectModalContentExists);

	return (
		<Router>
			<Nav />
			<div className="message">{message}</div>
			{modalContentExists && <Modal />}
			<Banner />
			<Switch>
				<Route exact path={["/", "/posts"]} component={Posts} />
				<Route path="/posts/new" component={NewPost} />
				<Route path="/posts/:postId" component={Post} />
				<Route path="/cards" component={Cards} />
				<Route component={Error404} />
			</Switch>
		</Router>
	);
};

export default App;
