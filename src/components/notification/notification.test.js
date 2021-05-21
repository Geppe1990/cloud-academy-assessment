import React from "react";
import Notification from "./notification";

it("Renders notification without crashing", () => {
	shallow(<Notification />);
});