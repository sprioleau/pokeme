import React from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import "./styles/style.scss";

const Nav = () => {
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

// Bug Fix for: "Warning: React does not recognize the `computedMatch` prop on a DOM element."
// Reference: https://stackoverflow.com/questions/51971449/react-warning-computedmatch-regarding-some-case-issues
// Action: Remove unnecessary wrapper div.

const App = () => {
	// return <h1>Hello World!</h1>;
	return (
		<Router>
			<Switch>
				<Nav />
				<Route exact path="/" component={Welcome} />
				<Route path="/about" component={About} />
				<Route path="/test/:id" component={Test} />
				<Route component={FallBack} />
			</Switch>
		</Router>
	);
};

export default App;
