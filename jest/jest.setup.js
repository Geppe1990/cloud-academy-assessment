import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import jsdom from "jest-environment-jsdom";
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.renderer = renderer;
global.mount = mount;
global.jsdom = jsdom;
global.location = {};
global.document = {};

global.window = Object.create(window);
const url = "http://localhost";
Object.defineProperty(window, "location", {
	value: {
		href: url
	},
	writable: true
});
