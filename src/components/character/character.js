import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Badges from "../badges/badges";
import Pagination from "../pagination/pagination";
import Notification from "../notification/notification";
import Location from "../location/location";
import Info from "../info/info";
import { endpoints } from "../../variables";
import { get, getAll } from "../../helpers";
import axios from "axios";
import "./character.scss";

const Character = () => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const { id } = useParams();

	const hasCharacter = () => {
		return Object.keys(character).length > 0;
	};

	const hasError = () => {
		return errorMessage && errorMessage.length != 0;
	};

	const getUser = () => {
		get(
			`${endpoints.CHARACTER}${id}`,
			(response) => {
				const episodesCalls = [];

				response.data.episode.forEach((url) =>
					url ? episodesCalls.push(axios.get(url)) : null
				);

				setCharacter(response.data);
				_getEpisodes(episodesCalls);
			},
			setErrorMessage
		);
	};

	const _getEpisodes = (urls) => {
		getAll(
			urls,
			(response) => {
				setEpisodes(response);
			},
			setErrorMessage
		);
	};

	useEffect(() => {
		getUser();
	}, [id]);

	if (!hasCharacter(character) && !hasError(errorMessage)) {
		return <Notification message={"Loading..."} type={"alert"} />;
	}

	if (hasError(errorMessage)) {
		return <Notification message={errorMessage} type={"error"} />;
	}

	return (
		<>
			<div id="character" className="my-5">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<Info character={character} />
						</div>
						<div className="col-sm-8">
							{character.location.url ? (
								<Location placement={character.location.url} />
							) : null}
							<Badges keys={episodes} title={"Appears in: "} />
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<Pagination id={parseInt(id)} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Character;
