import React, { useState } from "react";

// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

// Utils
import LocalStorage from "../utils/localStorage.utils";

// Recoil
import { personalAccessTokenState } from "../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const AccessTokenInput = () => {
	const [token, setToken] = useState(null);

	const personalAccessToken = useRecoilValue(personalAccessTokenState);
	const setPersonalAccessToken = useSetRecoilState(personalAccessTokenState);

	const handleChange = (e) => {
		setToken(e.target.value);
	};

	const handleSave = (e) => {
		if (token === "") {
			setPersonalAccessToken(null);
			LocalStorage.setItem("personalAccessToken", null);
		} else {
			setPersonalAccessToken(token);
			LocalStorage.setItem("personalAccessToken", token);
		}
	};

	return (
		<div>
			<CssBaseline />
			{personalAccessToken === null ? (
				<Alert severity="warning">
					Personal Access Token value has not been saved yet!
				</Alert>
			) : (
				<Alert severity="info">
					Current Personal Access Token Value : {personalAccessToken}
				</Alert>
			)}

			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography>Please enter your personal access token below.</Typography>
				<Box sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="personal-access-token"
						label="GitHub Personal Access Token"
						name="personal-access-token"
						onChange={handleChange}
						autoFocus
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={handleSave}
						sx={{ mt: 3, mb: 2 }}
					>
						Save Personal Access Token
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default AccessTokenInput;
