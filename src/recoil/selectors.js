import { selectorFamily } from "recoil";
import { clearCacheByPass } from "./atoms";
import { search } from "../services/repository.service";
import { SEARCH_REPOSITORIES } from "../graphql/queries";

export const searchRepositoriesQuery = selectorFamily({
	key: "searchResultState",
	get:
		({ searchQuery, endCursor }) =>
		async ({ get }) => {
			get(clearCacheByPass);
			let queryString = `is:public ${searchQuery} in:name`;
			let query = SEARCH_REPOSITORIES(queryString, endCursor);
			const response = await search(query, endCursor);
			return response;
		},
});
