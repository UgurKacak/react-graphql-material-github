import * as React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Main from "./layouts/Main";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Main />
		</ThemeProvider>
	);
};

export default App;
