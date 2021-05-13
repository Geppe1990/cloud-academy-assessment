import React from "react";
import "./badges.scss";

const Badges = ({ keys, title }) => {
	return (
		<div className="badges">
			<h2>{title}</h2>
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
