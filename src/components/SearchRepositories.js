import React, { useRef } from "react";

// Material UI
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// Recoil
import { searchQueryState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

const SearchRepositories = (props) => {
	const searchInput = useRef(null);
	const setSearchQuery = useSetRecoilState(searchQueryState);
	const searchButtonHandler = () => {
		if (
			searchInput.current.lastChild.value !== undefined &&
			searchInput.current.lastChild.value !== null &&
			searchInput.current.lastChild.value !== ""
		) {
			setSearchQuery(
				`is:public ${searchInput.current.lastChild.value} in:name`
			);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (
				searchInput.current.lastChild.value !== undefined &&
				searchInput.current.lastChild.value !== null &&
				searchInput.current.lastChild.value !== ""
			) {
				setSearchQuery(
					`is:public ${searchInput.current.lastChild.value} in:name`
				);
			}
		}
	};

	return (
		<div>
			<Paper sx={{ p: "2px 14px", display: "flex" }}>
				<IconButton sx={{ p: "10px" }} aria-label="menu">
					<GitHubIcon />
				</IconButton>

				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

				<InputBase
					ref={searchInput}
					sx={{ ml: 1, flex: 1 }}
					onKeyDown={handleKeyDown}
					placeholder="Search Public Repositories on GitHub"
				/>

				<IconButton
					edge="end"
					onClick={searchButtonHandler}
					sx={{ p: "10px" }}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Paper>
		</div>
	);
};

export default SearchRepositories;
