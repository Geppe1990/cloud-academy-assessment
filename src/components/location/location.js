import React, { useEffect, useState } from "react";
import { get } from "../../helpers";
import "./location.scss";

const Location = ({ placement }) => {
	const [location, setlocation] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		getCurrentLocation();
	}, [placement]);

	const getCurrentLocation = () => {
		get(
			placement,
			(response) => {
				setlocation(response.data);
			},
			setErrorMessage
		);
	};

	const hasLocation = (location) => {
		return Object.keys(location).length > 0;
	};

	if (errorMessage && errorMessage.length != 0) {
		return <></>;
	}

	if (!hasLocation(location)) {
		return <></>;
	}

	return (
		<div id="location" className="card">
			<div className="card-body">
				<h2 className="card-title">Location</h2>
				<p className="card-text">
					<b className="card-title text-muted">Location: </b>
					{location.name}
				</p>
				<p className="card-text">
					<b className="card-title text-muted">Dimension: </b>
					{location.dimension}
				</p>
				<p className="card-text">
					<b className="card-title text-muted">Name: </b>
					{location.name}
				</p>
				<p className="card-text">
					<b className="card-title text-muted">Type: </b>
					{location.type}
				</p>
				<p className="card-text">
					<b className="card-title text-muted">Residents: </b>
					{location.residents ? location.residents.length : 0}
				</p>
			</div>
		</div>
	);
};

export default Location;
