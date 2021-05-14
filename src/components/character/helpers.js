import axios from "axios";
import { endpoints } from "../../variables";

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
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
				_redirectHome();
			} else if (error.request) {
				console.log(error.request);
				_redirectHome();
			} else {
				console.log("Error", error.message);
				setErrorMessage(error.message);
			}
		});
};

const _getEpisodes = (urls, setEpisodes, setErrorMessage) => {
	axios
		.all(urls)
		.then((response) => {
			setEpisodes(response);
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
				_redirectHome();
			} else if (error.request) {
				console.log(error.request);
				_redirectHome();
			} else {
				console.log("Error", error.message);
				setErrorMessage(error.message);
			}
		});
};

const _redirectHome = () => {
	window.location.replace("/");
};
