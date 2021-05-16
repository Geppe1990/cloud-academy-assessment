import axios from "axios";

export const get = (url, callback, errorCallback) => {
	if (!url) {
		return;
	}

	axios
		.get(url)
		.then((response) => {
			callback(response);
		})
		.catch((error) => _errorsManager(error, errorCallback));
};

export const getAll = (urls, callback, errorCallback) => {
	if (!urls) {
		return;
	}

	axios
		.all(urls)
		.then((response) => {
			callback(response);
		})
		.catch((error) => _errorsManager(error, errorCallback));
};

const _errorsManager = (error, callback) => {
	if (error.response) {
		console.log(error.response.data);
		callback(error.response.data.error);
	} else if (error.request) {
		console.log(error.request);
		callback(error.message);
	} else {
		console.log("Error", error.message);
		callback(error.message);
	}
};
