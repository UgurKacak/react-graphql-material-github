import { atom } from "recoil";

export const currentTabState = atom({
	key: "currentTabState",
	default: 0,
});

export const personalAccessTokenState = atom({
	key: "personalAccessTokenState",
	default: null,
});
