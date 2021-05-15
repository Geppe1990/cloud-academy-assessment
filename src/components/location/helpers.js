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
