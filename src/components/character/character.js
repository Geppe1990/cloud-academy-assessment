import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Badges from "../badges/badges";
import Pagination from "../pagination/pagination";
import Notification from "../notification/notification";
import Location from "../location/location";
import { getUser, hasCharacter, hasError } from "./helpers";
import "./character.scss";

const Character = () => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const { id } = useParams();

	useEffect(() => {
		getUser(id, setCharacter, setEpisodes, setErrorMessage);
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
								<img
									className="card-img-top"
									src={character.image}
									alt="Card image cap"
								/>
								<div className="card-body">
									<h5 className="card-title">
										{character.name}
									</h5>
									<p className="card-text">
										<span className="card-title text-muted">
											Status:
										</span>{" "}
										{character.status}
									</p>
									<p className="card-text">
										<span className="card-title text-muted">
											Species:
										</span>{" "}
										{character.species}
									</p>
									<p className="card-text">
										<span className="card-title text-muted">
											Gender:
										</span>{" "}
										{character.gender}
									</p>
									<p className="card-text">
										<span className="card-title text-muted">
											Origin:
										</span>{" "}
										{character.origin.name}
									</p>
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
							<Pagination id={id} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Character;
