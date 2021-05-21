import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

const Home = () => {
	return (
		<div id="home">
			<div className="container">
				<div className="row">
					<div className="col-sm-12 text-center">
						<h1>Rick & Morty</h1>
						<Link className="btn btn-primary" to="/1">
							Go to the first character
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
