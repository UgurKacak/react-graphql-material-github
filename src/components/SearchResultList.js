import React from "react";
import { v4 as uuidv4 } from "uuid";

// Material UI
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";

// Components
import RepoListItem from "./RepoListItem";

// Recoil
import { searchRepositoriesQuery } from "../recoil/selectors";
import { useRecoilValue } from "recoil";

const SearchResultList = ({ searchQuery, endCursor, fetchMoreRepo }) => {
	const searchResult = useRecoilValue(
		searchRepositoriesQuery({
			searchQuery,
			endCursor,
		})
	);

	if (searchResult.isAxiosError) {
		return (
			<div style={{ marginTop: "15px" }}>
				<Alert severity="error" style={{ margin: "-10px 5px 5px 5px" }}>
					{searchResult.message}
					<br />
					{searchResult.response.data.message}
				</Alert>
			</div>
		);
	} else {
		const list =
			searchResult !== undefined &&
			searchResult &&
			searchResult.edges.map(({ node }) => (
				<div key={uuidv4()}>
					<RepoListItem repository={node} />
				</div>
			));

		const moreList =
			searchResult !== undefined &&
			searchResult &&
			searchResult.pageInfo.hasNextPage ? (
				<Button
					onClick={() => {
						fetchMoreRepo(searchResult.pageInfo.endCursor);
					}}
					variant="contained"
					sx={{ ml: 95, mt: 1 }}
				>
					Get Next 10 Result
				</Button>
			) : (
				<Button sx={{ ml: 95, mt: 1 }} disabled>
					No more results
				</Button>
			);

		return (
			<div style={{ marginTop: "15px" }}>
				{searchResult && searchResult.repositoryCount > 0 ? (
					<>
						<Alert severity="success" style={{ margin: "-5px 20px 0px 20px" }}>
							Showing{" "}
							<b>
								<i>{searchResult.repositoryCount}</i>
							</b>{" "}
							available repository results.
						</Alert>
						<List>
							{list}
							{moreList}
						</List>
					</>
				) : (
					<Alert severity="warning" style={{ margin: "-10px 5px 5px 5px" }}>
						There is no available repository results.
					</Alert>
				)}
			</div>
		);
	}
};

export default SearchResultList;
