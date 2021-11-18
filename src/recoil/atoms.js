import { atom } from "recoil";
import LocalStorage from "../utils/localStorage.utils";
export const currentTabState = atom({
	key: "currentTabState",
	default: 0,
});

export const personalAccessTokenState = atom({
	key: "personalAccessTokenState",
	default: LocalStorage.getItem("personalAccessToken"),
});

export const searchQueryState = atom({
	key: "searchQueryState",
	default: "ugurkacak",
});


export const searchResultState = atom({
	key: "searchResultState",
	default: null,
});

export const clearCacheByPass = atom({
	key: "clearCacheByPass",
	default: 0,
});
