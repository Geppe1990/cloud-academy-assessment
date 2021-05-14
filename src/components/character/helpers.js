import axios from "axios";
import { endpoints } from "../../variables";

export const getUser = (id, setCharacter, setEpisodes) => {
	axios
		.get(`${endpoints.CHARACTER}${id}`)
		.then((response) => {
			const episodesCalls = [];
			response.data.episode.forEach((url) =>
				episodesCalls.push(axios.get(url))
			);

			setCharacter(response.data);
			_getEpisodes(episodesCalls, setEpisodes);
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
};

export const getTotalCharacters = (setTotalCharacters) => {
	axios
		.get(endpoints.GLOBAL)
		.then((response) => {
			setTotalCharacters(response.data.info.count);
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
};

const _getEpisodes = (urls, setEpisodes) => {
	axios
		.all(urls)
		.then((response) => {
			setEpisodes(response);
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
};
