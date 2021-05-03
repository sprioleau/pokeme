import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/style.scss";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import Error404 from "./components/Error404";
import { selectMessage } from "./store/selectors";

const App = () => {
	const message = useSelector(selectMessage);

	return (
		<Router>
			<Nav />
			<div className="message">{message}</div>
			<Switch>
				<Route exact path={["/", "/posts"]} component={Posts} />
				<Route path="/posts/new" component={NewPost} />
				<Route path="/posts/:postId" component={Post} />
				<Route component={Error404} />
			</Switch>
		</Router>
	);
};

export default App;
