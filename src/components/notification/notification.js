import React from "react";
import "./notification.scss";
import { Link } from "react-router-dom";

const Notification = ({ message, type }) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<span>{message}</span>
					{type == "error" ? (
						<Link className="btn btn-primary" to="/">
							Go to the first character
						</Link>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Notification;
