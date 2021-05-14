import React from "react";
import "./home.scss";
import Cta from "../cta/cta";

const Home = () => {
	return (
		<div className="container">
			<div className="home">
				<h1>Cloud Academy Assessment</h1>
				<Cta text={"Go to the first character"} link={"/1"} />
			</div>
		</div>
	);
};

export default Home;
