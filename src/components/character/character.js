import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Label from "../label/label";
import Badges from "../badges/badges";
import Pagination from "../pagination/pagination";
import Notification from "../notification/notification";
import "./character.scss";
import { getUser } from "../../helpers";

const Character = () => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const { id } = useParams();

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
		getUser(id, setCharacter, setEpisodes, setErrorMessage);
	}, [id]);

	if (Object.keys(character).length == 0 && !errorMessage) {
		return <Notification message={"Loading..."} type={"alert"} />;
	}

	if (errorMessage && errorMessage.length != 0) {
		return <Notification message={errorMessage} type={"error"} />;
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
				<Pagination id={id} />
			</div>
		</div>
	);
};

export default Character;
