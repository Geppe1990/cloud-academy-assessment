import axios from "axios";

export const hasPrev = (id) => !(parseInt(id) <= 1);
export const hasNext = (id, characters) => !(parseInt(id) == characters);

export const get = (url, callback, errorCallback) => {
	axios
		.get(url)
		.then((response) => {
			callback(response);
		})
		.catch((error) => _errorsManager(error, errorCallback));
};

export const getAll = (urls, callback, errorCallback) => {
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
