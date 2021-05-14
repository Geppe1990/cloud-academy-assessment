import React from "react";
import { Link } from "react-router-dom";
import "./cta.scss";

const Cta = ({ text, link }) => {
	return (
		<Link className="cta" to={link}>
			{text}
		</Link>
	);
};

export default Cta;
