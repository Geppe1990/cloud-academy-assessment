import React from "react";
import "./badges.scss";
import Label from "../label/label";

const Badges = ({ keys, title }) => {
	return (
		<div className="badges">
			<Label tag={"h2"} data={title}></Label>
			{keys.length > 0
				? keys.map((key, index) => (
						<span key={index} data-episode={key.data.episode}>
							{key.data.name}
						</span>
				  ))
				: null}
		</div>
	);
};

export default Badges;
