import React from "react";
import "./home.scss";
import Cta from "../cta/cta";
import Label from "../label/label";

const Home = () => {
	return (
		<div className="container">
			<div className="home">
				<Label tag={"h1"} data={"Rick e Morty "}></Label>
				<Cta text={"Go to the first character"} link={"/1"} />
			</div>
		</div>
	);
};

export default Home;
