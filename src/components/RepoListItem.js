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

// Recoil
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

	const alphabetPosition = (text) => {
		let result = "";
		for (let i = 0; i < text.length; i++) {
			let code = text.toUpperCase().charCodeAt(i);
			if (code > 64 && code < 91) result += code - 64 + " ";
		}

		return result.slice(0, result.length - 1);
	};

	const LanguageIcon = (text) => {
		var colorArray = [
			"red","yellow","blue","cyan","orange","purple","green","white"
		];
		let firstLetter = text.lang.charAt(0);
		let color = colorArray[alphabetPosition(firstLetter) % 7];
		return (
			<span
				style={{
					position: "relative",
					top: "1px",
					display: "inline-block",
					width: "12px",
					height: "12px",
					border: "2px solid" + color,
					borderRadius: "50%",
					backgroundColor: color,
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
											<LanguageIcon lang={repository.primaryLanguage.name} />
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
