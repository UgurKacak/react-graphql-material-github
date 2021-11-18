import React, { useEffect, useState } from "react";

// Material UI
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

// Octicons
import { RepoIcon, StarIcon, EyeIcon } from "@primer/octicons-react";

import { starAction, watchAction } from "../services/repository.service";
import { STAR_ACTION, WATCH_ACTION } from "../graphql/mutations";

import { clearCacheByPass } from "../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { v4 as uuidv4 } from "uuid";
const RepoListItem = (props) => {
	const [topicList, setTopicList] = useState(null);
	const { repository } = props;

	useEffect(() => {
		let tempList = repository.repositoryTopics.edges.map(({ node }) => (
			<div key={uuidv4()}>
				<Chip
					label={node.topic.name}
					component="a"
					href={`https://github.com/topics/${node.topic.name}`}
					clickable
					color="secondary"
					size="small"
				/>
			</div>
		));
		setTopicList(tempList);
	}, [repository]);

	const cacheVal = useRecoilValue(clearCacheByPass);
	const clearCache = useSetRecoilState(clearCacheByPass);

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

	const starHandler = async (params) => {
		let starState = repository.viewerHasStarred;
		let repositoryId = repository.id;
		let query = STAR_ACTION();
		if (starState) {
			query = query.replace("addStar", "removeStar");
		}
		await starAction(query, repositoryId);
		clearCache(cacheVal + 1);
	};

	const watchHandler = async (params) => {
		let subscribeState = repository.viewerSubscription;
		subscribeState =
			subscribeState === "SUBSCRIBED" ? "UNSUBSCRIBED" : "SUBSCRIBED";
		let repositoryId = repository.id;
		let query = WATCH_ACTION();
		await watchAction(query, repositoryId, subscribeState);
		clearCache(cacheVal + 1);
	};
	return (
		<>
			<Divider variant="middle" component="li" />
			<ListItem alignItems="flex-start">
				<ListItemAvatar style={{ marginRight: "-20px", marginTop: "5px" }}>
					<RepoIcon size={24} />
				</ListItemAvatar>
				<Grid container spacing={0.5}>
					<Grid item xs={12}>
						<Link href={repository.url} underline="hover">
							{repository.name}
						</Link>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="p" component="p">
							{repository.description}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Stack direction="row" spacing={1}>
							{topicList}
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack direction="row" spacing={1}>
							<span onClick={starHandler} style={{ cursor: "pointer" }}>
								<Stack direction="row" spacing={0.5}>
									<span>
										<StarIcon
											fill={repository.viewerHasStarred ? "yellow" : "gray"}
											size={16}
										/>
									</span>
									<span style={{ marginTop: "1px" }}>
										{repository.stargazers.totalCount}
									</span>
								</Stack>
							</span>
							{repository.primaryLanguage && (
								<span>
									<Stack direction="row" spacing={0.5}>
										<span>
											<LanguageIcon />
										</span>
										<span style={{ marginTop: "1px" }}>
											{repository.primaryLanguage.name}
										</span>
									</Stack>
								</span>
							)}

							<span onClick={watchHandler} style={{ cursor: "pointer" }}>
								<Stack direction="row" spacing={0.5}>
									<span>
										<EyeIcon
											fill={
												repository.viewerSubscription === "SUBSCRIBED"
													? "yellow"
													: "gray"
											}
											size={16}
										/>
									</span>
									<span style={{ marginTop: "1px" }}>
										{repository.watchers.totalCount}
									</span>
								</Stack>
							</span>
						</Stack>
					</Grid>
				</Grid>
			</ListItem>
			<Divider variant="middle" component="li" />
		</>
	);
};

export default RepoListItem;
