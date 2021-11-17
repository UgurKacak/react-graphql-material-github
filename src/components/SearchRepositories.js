import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
const SearchRepositories = () => {
	return (
		<Paper
			component="form"
			sx={{ p: "2px 14px", display: "flex"}}
		>
			<IconButton sx={{ p: "10px" }} aria-label="menu">
				<GitHubIcon />
			</IconButton>

			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search Public Repositories on GitHub"
				inputProps={{ "aria-label": "search google maps" }}
			/>
			<IconButton edge="end" type="submit" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchRepositories;
