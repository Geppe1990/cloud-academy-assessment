import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Label from "./label.js";
import Badges from "./badges.js";
import { endpoints } from "../variables";
import "../style/_character.scss";

const Character = (props) => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);

	const _getUser = () => {
		try {
			axios
				.get(`${endpoints.CHARACTER}${props.match.params.id}`)
				.then((response) => {
					const episodesCalls = [];
					response.data.episode.forEach((url) =>
						episodesCalls.push(axios.get(url))
					);

					setCharacter(response.data);
					_getEpisode(episodesCalls);
				});
		} catch (error) {
			console.log(error);
			_redirectHome();
		}
	};

	const _getEpisode = (urls) => {
		axios.all(urls).then((response) => {
			response.map((episode) =>
				setEpisodes((episodes) => [...episodes, episode.data])
			);
		});
	};

	const _redirectHome = () => {
		window.location.replace("/");
	};

	const _getTotalCharacters = async () => {
		try {
			const {
				data: {
					info: { count }
				}
			} = await axios.get(endpoints.GLOBAL);
			setTotalCharacters(count);
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

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
		_getTotalCharacters();
	}, []);

	useEffect(() => {
		setEpisodes([]);
		_getUser(props.match.params.id);
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
