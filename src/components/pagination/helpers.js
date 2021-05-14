import axios from "axios";
import { endpoints } from "../../variables";

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

export const hasPrev = (id) => !(parseInt(id) <= 1);
export const hasNext = (id, totalCharacters) =>
	!(parseInt(id) >= totalCharacters);

const _redirectHome = () => {
	window.location.replace("/");
};
