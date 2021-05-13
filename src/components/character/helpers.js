import axios from "axios";
import { endpoints } from "../../variables";

export const getUser = (id, setCharacter, setEpisodes) => {
	try {
		axios.get(`${endpoints.CHARACTER}${id}`).then((response) => {
			const episodesCalls = [];
			response.data.episode.forEach((url) =>
				episodesCalls.push(axios.get(url))
			);

			setCharacter(response.data);
			_getEpisode(episodesCalls, setEpisodes);
		});
	} catch (error) {
		console.log(error);
		_redirectHome();
	}
};

export const getTotalCharacters = (setTotalCharacters) => {
	try {
		axios.get(endpoints.GLOBAL).then((response) => {
			setTotalCharacters(response.data.info.count);
		});
	} catch (error) {
		console.log(error);
	}
};

const _getEpisode = (urls, setEpisodes) => {
	axios.all(urls).then((response) => {
		setEpisodes(response);
	});
};

const _redirectHome = () => {
	window.location.replace("/");
};
