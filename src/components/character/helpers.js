import { endpoints } from "../../variables";
import { fetch, fetchAll } from "../../helpers";
import axios from "axios";

export const getUser = (
	id,
	callbackCharacter,
	callbackEpisodes,
	callbackError
) => {
	fetch(
		`${endpoints.CHARACTER}${id}`,
		(response) => {
			const episodesCalls = [];
			response.data.episode.forEach((url) =>
				episodesCalls.push(axios.get(url))
			);

			callbackCharacter(response.data);
			_getEpisodes(episodesCalls, callbackEpisodes, callbackError);
		},
		callbackError
	);
};

const _getEpisodes = (urls, episodesCallback, errorCallback) => {
	fetchAll(
		urls,
		(response) => {
			episodesCallback(response);
		},
		errorCallback
	);
};
