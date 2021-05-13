import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Label from "../label/label";
import Badges from "../badges/badges";
import "./character.scss";
import { getUser, getTotalCharacters } from "./helpers";

const Character = (props) => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);

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

	const _resetState = () => {
		setEpisodes([]);
		setCharacter({});
	};

	useEffect(() => {
		getTotalCharacters(setTotalCharacters);
	}, []);

	useEffect(() => {
		_resetState();
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
					<Link
						className={
							"character__prev " +
							(parseInt(props.match.params.id) - 1 <= 0
								? "hidden"
								: "")
						}
						to={`/character/${parseInt(props.match.params.id) - 1}`}
					>
						<FaChevronLeft />
					</Link>
					<Link
						className={
							"character__next " +
							(parseInt(props.match.params.id) + 1 >
							totalCharacters
								? "hidden"
								: "")
						}
						to={`/character/${parseInt(props.match.params.id) + 1}`}
					>
						<FaChevronRight />
					</Link>
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
			</div>
		</div>
	);
};

export default Character;
