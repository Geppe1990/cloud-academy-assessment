import React from "react";
import Pagination from "./pagination";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => ({
		pathname: "localhost:8080/1"
	})
}));

it("Renders pagination without crashing", () => {
	shallow(<Pagination />);
});