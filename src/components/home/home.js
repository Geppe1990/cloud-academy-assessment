import React from "react";
import "./home.scss";
import Cta from "../cta/cta";
import Label from "../label/label";

const Home = () => {
	return (
		<div id="home">
			<Label tag={"h1"} data={"Rick & Morty "}></Label>
			<Cta text={"Go to the first character"} link={"/1"} />
		</div>
	);
};

export default Home;
