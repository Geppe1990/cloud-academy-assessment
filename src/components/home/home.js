import React from "react";
import "./home.scss";
import Cta from "../cta/cta";

const Home = () => {
	return (
		<div id="home">
			<h1>Rick & Morty</h1>
			<Cta text={"Go to the first character"} link={"/1"} />
		</div>
	);
};

export default Home;
