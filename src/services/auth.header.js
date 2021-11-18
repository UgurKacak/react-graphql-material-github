import LocalStorage from "../utils/localStorage.utils";

export const authHeader = () => {
	const personalAccessToken = LocalStorage.getItem("personalAccessToken");
	if (personalAccessToken) {
		return { Authorization: "Bearer " + personalAccessToken };
	} else {
		return {};
	}
};
