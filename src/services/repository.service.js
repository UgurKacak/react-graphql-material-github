import axios from "axios";
import { authHeader } from "./auth.header";

export const search = async(query, cursor) => {
	//console.log(query)
	const personalAccessToken = authHeader();
	return axios
		.post(
			`https://api.github.com/graphql`,
			{
				query,
				variables: { cursor },
			},
			{ headers: personalAccessToken }
		)
		.then((result) => {
			if (result.data.data.search.edges.length === 0) {
				return null;
			} else {
				return result.data.data.search;
			}
		})
		.catch((err) => {
			return err;
		});
};

export const starAction = async(query, repositoryId) => {
	const personalAccessToken = authHeader();
	return axios
		.post(
			`https://api.github.com/graphql`,
			{
				query,
				variables: { repositoryId },
			},
			{ headers: personalAccessToken }
		)
		.catch((err) => {
			return err;
		});
};

export const watchAction = async(query, repositoryId, subscribeState) => {
	const personalAccessToken = authHeader();
	return axios
		.post(
			`https://api.github.com/graphql`,
			{
				query,
				variables: { repositoryId, subscribeState },
			},
			{ headers: personalAccessToken }
		)
		.catch((err) => {
			return err;
		});
};
