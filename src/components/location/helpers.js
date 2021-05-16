import { get } from "../../helpers";

export const getCurrentLocation = (url, callbackLocation, callbackError) => {
	get(
		url,
		(response) => {
			callbackLocation(response.data);
		},
		callbackError
	);
};

export const hasLocation = (location) => {
	return Object.keys(location).length > 0;
};
