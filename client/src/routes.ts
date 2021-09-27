import React from "react";
import CharacterDetailPage from "./components/CharacterDetailPage/CharacterDetailPage";
import CharactersOverviewPage from "./components/CharactersOverviewPage/CharactersOverviewPage";
import CreateCharacterForm from "./components/CreateCharacterForm/CreateCharacterForm";
import mapParamsToProps from "./functions/mapParamsToProps";

export interface Route {
	path: string;
	title: string;
	component: React.ComponentType;
	inNavMenu: boolean;
	exact: boolean;
	format: "full-width" | "normal-width" | "narrow"
}

export const routes: { [ key: string ]: Route } = {
	home: {
		path: "/",
		component: CharactersOverviewPage,
		title: "Characters",
		inNavMenu: true,
		exact: true,
		format: "narrow",
	},

	newCharacter: {
		path: "/new-character",
		component: CreateCharacterForm,
		title: "New character",
		inNavMenu: true,
		exact: false,
		format: "normal-width",
	},

	characterDetails: {
		path: "/characters/:id/details",
		component: mapParamsToProps( CharacterDetailPage, { id: { name: "characterId", normalize: parseInt } } ),
		title: "Character sheet",
		inNavMenu: false,
		exact: true,
		format: "normal-width",
	},
};
