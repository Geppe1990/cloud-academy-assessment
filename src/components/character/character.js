import React, { useState, useEffect } from "react";
import Label from "../label/label";
import Badges from "../badges/badges";
import Pagination from "../pagination/pagination";
import "./character.scss";
import { getUser } from "./helpers";

const Character = (props) => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);

	const _statusManager = (data) => {
		switch (data) {
			case "Alive":
				return <span className="status alive"></span>;
			case "Dead":
				return <span className="status dead"></span>;
			case "unknown":
				return <span className="status unknown"></span>;
			default:
				return null;
		}
	};

	useEffect(() => {
		setEpisodes([]);
		getUser(props.match.params.id, setCharacter, setEpisodes);
	}, [props.match.params.id]);

	if (Object.keys(character).length == 0) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="container">
			<div className="character">
				<Label data={character.name} tag={"h1"} />

				<div className="character__wrapper">
					<img src={character.image} alt={character.name} />
					<div className="character__data">
						<Label
							label={"Status: "}
							data={character.status}
							additionalData={_statusManager(character.status)}
						/>
						<Label label={"Species: "} data={character.species} />
						<Label label={"Type: "} data={character.type} />
						<Label label={"Gender: "} data={character.gender} />
						<Label
							label={"Origin: "}
							data={character.origin.name}
						/>
						<Label
							label={"Location: "}
							data={character.location.name}
						/>
					</div>
				</div>
				<Badges keys={episodes} title={"Appears in: "} />
				<Pagination id={props.match.params.id} />
			</div>
		</div>
	);
};

export default Character;
