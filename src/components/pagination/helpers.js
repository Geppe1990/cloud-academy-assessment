import { endpoints } from "../../variables";
import { get } from "../../helpers";

export const getcurrentPage = (
	id,
	callbackPages,
	callbackCharacters,
	callbackError
) => {
	const currentPage = id / 20 < 0 ? 1 : Math.ceil(id / 20);

	get(
		`${endpoints.CHARACTER}?page=${currentPage}`,
		(response) => {
			callbackPages(response.data.results);
			callbackCharacters(response.data.info.count);
		},
		callbackError
	);
};
