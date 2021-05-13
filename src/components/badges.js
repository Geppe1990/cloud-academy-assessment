/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import "../style/_badges.scss";

const Badges = ({keys, title}) => {
	return(
		<div className="badges">
			<h2>{title}</h2>
			{keys.map((key, index) => (
				<span key={index} data-episode={key.episode}>
					{key.name}
				</span>
			))}
		</div>
	)
}

export default Badges;