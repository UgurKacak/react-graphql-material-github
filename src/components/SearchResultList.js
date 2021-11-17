import React, { useState } from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import RepoListItem from "./RepoListItem";
const SearchResultList = () => {
	const [page, setPage] = useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};
	return (
		<div style={{ marginTop: "15px" }}>
			<div style={{ marginLeft: "20px" }}>
				<Typography variant="p" component="p">
					Showing 2,431,352 available repository results
				</Typography>
			</div>
			<List>
				<Divider variant="middle" component="li" />
				<RepoListItem data={""} />
				<Divider variant="middle" component="li" />
				<RepoListItem data={""} />
				<Divider variant="middle" component="li" />
				<Stack spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
					<Pagination count={10} page={page} onChange={handleChange} />
				</Stack>
				<Divider variant="middle" component="li" />
			</List>
		</div>
	);
};

export default SearchResultList;
