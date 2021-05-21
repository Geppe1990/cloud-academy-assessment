import React from "react";
import App from "./App";

it("Renders without crashing", () => {
	shallow(<App />);
});

it('match the snapshot', () => {
const wrapper = renderer.create(<App />).toJSON();
	expect(wrapper).toMatchSnapshot();
});