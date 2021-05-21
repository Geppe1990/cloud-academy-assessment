import React from "react";
import Character from "./character";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({
		id: "1"
	})
}));

it("Renders character without crashing", () => {
	shallow(<Character />);
});

it('match the snapshot', () => {
	const wrapper = renderer.create(<Character />).toJSON();
	expect(wrapper).toMatchSnapshot();
});