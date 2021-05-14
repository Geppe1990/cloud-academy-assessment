import React from "react";
import "./notification.scss";
import Cta from "../cta/cta";

const Notification = ({ message, type }) => {
	return (
		<div className="container">
			<div className={`notification ${type}`}>
				<span>{message}</span>
				{type == "error" ? (
					<Cta link={"/"} text={"Go to Home"} />
				) : null}
			</div>
		</div>
	);
};

export default Notification;
