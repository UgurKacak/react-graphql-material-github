import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Content from "./Content";
import Header from "./Header";

let theme = createTheme({
	palette: {
		mode: "dark",
	},
	shape: {
		borderRadius: 8,
	},
});

theme = {
	...theme,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
				contained: {
					boxShadow: "none",
					"&:active": {
						boxShadow: "none",
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					marginLeft: theme.spacing(1),
				},
				indicator: {
					height: 3,
					borderTopLeftRadius: 3,
					borderTopRightRadius: 3,
					backgroundColor: theme.palette.common.white,
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					borderRadius: 4,
				},
			},
		},
	},
};

export default function Main() {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex", minHeight: "100vh" }}>
				<CssBaseline />
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<Header />
					<Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#000" }}>
						<Content />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
