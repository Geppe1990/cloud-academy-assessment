import React from "react";
import "./badges.scss";

const Badges = ({ keys, title }) => {
	return (
		<div id="badges" className="card mt-2">
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				{keys.length > 0
					? keys.map((key, index) => (
							<span
								className="badge badge-secondary mr-1"
								key={index}
								data-episode={key.data.episode}
							>
								{key.data.name}
							</span>
					  ))
					: null}
			</div>
		</div>
	);
};

export default Badges;
