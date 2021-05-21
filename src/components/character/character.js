import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Badges from "../badges/badges";
import Pagination from "../pagination/pagination";
import Notification from "../notification/notification";
import Location from "../location/location";
import { endpoints } from "../../variables";
import { get, getAll } from "../../helpers";
import axios from "axios";
import "./character.scss";

const Character = () => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const { id } = useParams();

	const hasCharacter = (character) => {
		return Object.keys(character).length > 0;
	};

	const hasError = (errorMessage) => {
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
										<h5 className="card-title">
											{character.name}
										</h5>
									) : null}
									{character.status ? (
										<p className="card-text">
											<span className="card-title text-muted">
												Status:
											</span>{" "}
											{character.status}
										</p>
									) : null}
									{character.species ? (
										<p className="card-text">
											<span className="card-title text-muted">
												Species:
											</span>{" "}
											{character.species}
										</p>
									) : null}
									{character.gender ? (
										<p className="card-text">
											<span className="card-title text-muted">
												Gender:
											</span>{" "}
											{character.gender}
										</p>
									) : null}
									{character.origin.name ? (
										<p className="card-text">
											<span className="card-title text-muted">
												Origin:
											</span>{" "}
											{character.origin.name}
										</p>
									) : null}
								</div>
							</div>
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
