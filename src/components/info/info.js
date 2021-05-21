import React from "react";
import "./info.scss";

const Info = ({ character }) => {
	if (!character) {
		return <></>;
	}

	return (
		<div className="card h-100">
			{character.image ? (
				<img
					className="card-img-top"
					src={character.image}
					alt="Card image cap"
				/>
			) : null}
			<div className="card-body">
				{character.name ? (
					<h5 className="card-title">{character.name}</h5>
				) : null}
				{character.status ? (
					<p className="card-text">
						<b className="card-title text-muted">Status:</b>{" "}
						{character.status}
					</p>
				) : null}
				{character.species ? (
					<p className="card-text">
						<b className="card-title text-muted">Species:</b>{" "}
						{character.species}
					</p>
				) : null}
				{character.gender ? (
					<p className="card-text">
						<b className="card-title text-muted">Gender:</b>{" "}
						{character.gender}
					</p>
				) : null}
				{character.origin.name ? (
					<p className="card-text">
						<b className="card-title text-muted">Origin:</b>{" "}
						{character.origin.name}
					</p>
				) : null}
			</div>
		</div>
	);
};

export default Info;
