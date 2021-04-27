import React from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import "./styles/style.scss";

const Nav = (props) => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<NavLink to="/test/id1">test id1</NavLink>
				</li>
				<li>
					<NavLink to="/test/id2">test id2</NavLink>
				</li>
			</ul>
		</nav>
	);
};

const About = () => {
	return <div> All there is to know about me </div>;
};

const Welcome = () => {
	return <div>Welcome</div>;
};

const Test = (props) => {
	return <div> ID: {props.match.params.id} </div>;
};

const FallBack = () => {
	return <div>URL Not Found</div>;
};

const App = () => {
	// return <h1>Hello World!</h1>;
	return (
		<Router>
			<Switch>
				<div>
					<Nav />
					<Route exact path="/" component={Welcome} />
					<Route path="/about" component={About} />
					<Route exact path="/test/:id" component={Test} />
					<Route component={FallBack} />
				</div>
			</Switch>
		</Router>
	);
};

export default App;
