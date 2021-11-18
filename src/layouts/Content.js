import React, { useState, Suspense } from "react";

// Material UI
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import SearchRepositories from "../components/SearchRepositories";
import AccessTokenInput from "../components/AccessTokenInput";
import SearchResultList from "../components/SearchResultList";
import TabPanel from "../components/TabPanel";

// Recoil
import { currentTabState, searchQueryState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";

export default function Content() {
	const currentTab = useRecoilValue(currentTabState);
	const currentSearchQuery = useRecoilValue(searchQueryState);
	const [endCursor, setEndCursor] = useState("");

	const fetchMoreRepo = (endCursor) => {
		setEndCursor(endCursor);
	};
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
							<SearchResultList
								searchQuery={currentSearchQuery}
								endCursor={endCursor}
								fetchMoreRepo={fetchMoreRepo}
							/>
						</Suspense>
					)}
				</Paper>
			</TabPanel>
		</div>
	);
}
