import axios from "axios";
import { endpoints } from "./variables";

export const getUser = (
	id,
	callbackCharacter,
	callbackEpisodes,
	callbackError
) => {
	_fetch(
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

export const getcurrentPage = (
	id,
	callbackPages,
	callbackCharacters,
	callbackError
) => {
	const currentPage = id / 20 < 0 ? 1 : Math.ceil(id / 20);

	_fetch(
		`${endpoints.CHARACTER}?page=${currentPage}`,
		(response) => {
			callbackPages(response.data.results);
			callbackCharacters(response.data.info.count);
		},
		callbackError
	);
};

export const hasPrev = (id) => !(parseInt(id) <= 1);
export const hasNext = (id, characters) => !(parseInt(id) >= characters);

const _fetch = (url, callback, errorCallback) => {
	axios
		.get(url)
		.then((response) => {
			callback(response);
		})
		.catch((error) => _errorsManager(error, errorCallback));
};

const _fetchAll = (urls, callback, errorCallback) => {
	axios
		.all(urls)
		.then((response) => {
			callback(response);
		})
		.catch((error) => _errorsManager(error, errorCallback));
};

const _redirectHome = () => {
	window.location.replace("/");
};

const _getEpisodes = (urls, episodesCallback, errorCallback) => {
	_fetchAll(
		urls,
		(response) => {
			episodesCallback(response);
		},
		errorCallback
	);
};

const _errorsManager = (error, callback) => {
	if (error.response) {
		console.log(error.response.data);
		_redirectHome();
	} else if (error.request) {
		console.log(error.request);
		_redirectHome();
	} else {
		console.log("Error", error.message);
		callback(error.message);
	}
};
