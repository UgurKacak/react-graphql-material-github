import React from "react";
import Paper from "@mui/material/Paper";

import { currentTabState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

import TabPanel from "../TabPanel";
import AccessTokenInput from "../AccessTokenInput";
import SearchRepositories from "../SearchRepositories";
import SearchResultList from "../SearchResultList";
export default function Content() {
	const currentTab = useRecoilValue(currentTabState);
	return (
		<div>
			<TabPanel value={currentTab} index={0}>
				<Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
					<AccessTokenInput />
				</Paper>
			</TabPanel>
			<TabPanel value={currentTab} index={1}>
				<Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
					<SearchRepositories />
					<SearchResultList />
				</Paper>
			</TabPanel>
		</div>
	);
}
