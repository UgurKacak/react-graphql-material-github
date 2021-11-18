import React from "react";

// Material UI
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";

// Recoil
import {
	currentTabState,
	personalAccessTokenState,
	clearCacheByPass,
} from "../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Header = () => {
	const personalAccessToken = useRecoilValue(personalAccessTokenState);
	const currentTab = useRecoilValue(currentTabState);
	const setCurrentTab = useSetRecoilState(currentTabState);

	const cache = useRecoilValue(clearCacheByPass);
	const setCache = useSetRecoilState(clearCacheByPass);

	const handleChange = (event, newValue) => {
		if (newValue === 1) {
			setCache(cache + 1);
		}
		setCurrentTab(parseInt(newValue));
	};

	return (
		<React.Fragment>
			<AppBar color="primary" position="sticky" elevation={0}></AppBar>
			<AppBar
				component="div"
				color="primary"
				position="static"
				elevation={0}
				sx={{ zIndex: 0 }}
			>
				<Toolbar>
					<Grid container alignItems="center" spacing={1}>
						<GitHubIcon
							style={{ marginTop: "5px" }}
							fontSize="large"
							color="primary"
						/>
						<Grid item xs>
							<Typography color="inherit" variant="h5" component="h1">
								GitHub GraphQL API
							</Typography>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<AppBar
				component="div"
				position="static"
				elevation={0}
				sx={{ zIndex: 0 }}
			>
				<Tabs value={currentTab} onChange={handleChange} textColor="inherit">
					<Tab label="Personal Access Token" />
					<Tab
						label="Search Repositories"
						disabled={personalAccessToken === null ? true : false}
					/>
				</Tabs>
			</AppBar>
		</React.Fragment>
	);
};
export default Header;
