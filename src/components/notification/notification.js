import React from "react";
import "./notification.scss";
import Cta from "../cta/cta";

const Notification = ({ message, type }) => {
	return (
		<>
			<span>{message}</span>
			{type == "error" ? <Cta link={"/"} text={"Go to Home"} /> : null}
		</>
	);
};

export default Notification;
