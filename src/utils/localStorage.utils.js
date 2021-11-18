const deleteItem = (key) => {
	return new Promise((resolve, reject) => {
		localStorage.removeItem(key);
		resolve();
	});
};

const setItem = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

const LocalStorage = {
	deleteItem,
	setItem,
	getItem,
};

export default LocalStorage;
