import React, { Suspense } from "react";

// Material UI
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import SearchRepositories from "../SearchRepositories";
import AccessTokenInput from "../AccessTokenInput";
import SearchResultList from "../SearchResultList";
import TabPanel from "../TabPanel";

// Recoil
import { currentTabState, searchQueryState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

export default function Content() {
	const currentTab = useRecoilValue(currentTabState);
	const currentSearchQuery = useRecoilValue(searchQueryState);
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
				</Paper>
				<Paper
					sx={{
						maxWidth: 936,
						margin: "auto",
						overflow: "hidden",
						marginTop: "10px",
					}}
				>
					{currentSearchQuery && (
						<Suspense fallback={<LinearProgress color="secondary" />}>
							<SearchResultList searchQuery={currentSearchQuery} />
						</Suspense>
					)}
				</Paper>
			</TabPanel>
		</div>
	);
}
