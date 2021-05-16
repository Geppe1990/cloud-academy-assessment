import { endpoints } from "../../variables";
import { get, getAll } from "../../helpers";
import axios from "axios";

export const getUser = (
	id,
	callbackCharacter,
	callbackEpisodes,
	callbackError
) => {
	get(
		`${endpoints.CHARACTER}${id}`,
		(response) => {
			const episodesCalls = [];
			response.data.episode.forEach((url) =>
				url ? episodesCalls.push(axios.get(url)) : null
			);

			callbackCharacter(response.data);
			_getEpisodes(episodesCalls, callbackEpisodes, callbackError);
		},
		callbackError
	);
};

export const hasCharacter = (character) => {
	return Object.keys(character).length > 0;
};

export const hasError = (errorMessage) => {
	return errorMessage && errorMessage.length != 0;
};

const _getEpisodes = (urls, episodesCallback, errorCallback) => {
	getAll(
		urls,
		(response) => {
			episodesCallback(response);
		},
		errorCallback
	);
};
