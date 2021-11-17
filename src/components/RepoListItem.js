import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import { RepoIcon, StarIcon, EyeIcon } from "@primer/octicons-react";

const RepoListItem = () => {
	const LanguageIcon = () => {
		return (
			<span
				style={{
					position: "relative",
					top: "1px",
					display: "inline-block",
					width: "12px",
					height: "12px",
					border: "1px solid yellow",
					borderRadius: "50%",
					backgroundColor: "yellow",
				}}
			></span>
		);
	};

	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar style={{ marginRight: "-20px" }}>
				<RepoIcon size={24} />
			</ListItemAvatar>
			<Grid container spacing={0.5}>
				<Grid item xs={12}>
					<Link href="#" underline="hover">
						mui-org/material-ui
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="p" component="p">
						MUI (formerly Material-UI) is the React UI library you always
						wanted. Follow your own design system, or start with Ma…
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack direction="row" spacing={1}>
						<Chip
							label="react"
							component="a"
							href="#basic-chip"
							clickable
							color="secondary"
							size="small"
						/>
						<Chip
							label="material-design"
							component="a"
							href="#basic-chip"
							clickable
							color="secondary"
							size="small"
						/>
						<Chip
							label="javascript"
							component="a"
							href="#basic-chip"
							clickable
							color="secondary"
							size="small"
						/>
						<Chip
							label="typescript"
							component="a"
							href="#basic-chip"
							clickable
							color="secondary"
							size="small"
						/>
						<Chip
							label="react-components"
							component="a"
							href="#basic-chip"
							clickable
							color="secondary"
							size="small"
						/>
						<Chip
							label="hacktoberfest"
							component="a"
							href="#basic-chip"
							clickable
							color="secondary"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Stack direction="row" spacing={1}>
						<span>
							<Stack direction="row" spacing={0.5}>
								<span>
									<StarIcon size={16} />
								</span>
								<span style={{ marginTop: "1px" }}>25</span>
							</Stack>
						</span>
						<span>
							<Stack direction="row" spacing={0.5}>
								<span>
									<LanguageIcon />
								</span>
								<span style={{ marginTop: "1px" }}> Javascript</span>
							</Stack>
						</span>
						<span>
							<Stack direction="row" spacing={0.5}>
								<span>
									<EyeIcon size={16} />
								</span>
								<span style={{ marginTop: "1px" }}> 156</span>
							</Stack>
						</span>
					</Stack>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default RepoListItem;
