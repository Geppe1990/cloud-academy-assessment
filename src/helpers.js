import axios from "axios";
import { endpoints } from "./variables";

export const getUser = (id, setCharacter, setEpisodes, setErrorMessage) => {
	axios
		.get(`${endpoints.CHARACTER}${id}`)
		.then((response) => {
			const episodesCalls = [];
			response.data.episode.forEach((url) =>
				episodesCalls.push(axios.get(url))
			);

			setCharacter(response.data);
			_getEpisodes(episodesCalls, setEpisodes, setErrorMessage);
		})
		.catch((error) => _errorsManager(error, setErrorMessage));
};

export const getcurrentPage = (
	id,
	setPages,
	setTotalCharacters,
	setErrorMessage
) => {
	const currentPage = id / 20 < 0 ? 1 : Math.ceil(id / 20);

	axios
		.get(`${endpoints.CHARACTER}?page=${currentPage}`)
		.then((response) => {
			setPages(response.data.results);
			setTotalCharacters(response.data.info.count);
		})
		.catch((error) => _errorsManager(error, setErrorMessage));
};

export const hasPrev = (id) => !(parseInt(id) <= 1);
export const hasNext = (id, totalCharacters) =>
	!(parseInt(id) >= totalCharacters);

const _redirectHome = () => {
	window.location.replace("/");
};

const _getEpisodes = (urls, setEpisodes, setErrorMessage) => {
	axios
		.all(urls)
		.then((response) => {
			setEpisodes(response);
		})
		.catch((error) => _errorsManager(error, setErrorMessage));
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
