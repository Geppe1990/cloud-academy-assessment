import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Character from "./components/character/character";
import Home from "./components/home/home";

const App = () => {
	return (
		<Router>
			<Route exact path="/" component={Home} />
			<Route path="/:id" component={Character} />
		</Router>
	);
};

export default hot(App);
