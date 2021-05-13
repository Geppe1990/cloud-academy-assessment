import axios from "axios";
import { endpoints } from "../../variables";

export const getcurrentPage = (id, setPages, setTotalCharacters) => {
	const currentPage = id / 20 < 0 ? 1 : Math.ceil(id / 20);

	axios.get(`${endpoints.CHARACTER}?page=${currentPage}`).then((response) => {
		setPages(response.data.results);
		setTotalCharacters(response.data.info.count);
	});
};

export const hasPrev = (id) => !(parseInt(id) <= 1);
export const hasNext = (id, totalCharacters) =>
	!(parseInt(id) >= totalCharacters);
