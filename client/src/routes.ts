import React from "react";
import CharactersOverview from "./components/CharactersOverview/CharactersOverview";
import CreateCharacterForm from "./components/CreateCharacterForm/CreateCharacterForm";

export interface Route {
	path: string;
	title: string;
	component: React.ComponentType
	inNavMenu: boolean;
	exact: boolean;
}

export const routes: { [ key: string ]: Route } = {
	home: {
		path: "/",
		component: CharactersOverview,
		title: "Characters",
		inNavMenu: true,
		exact: true,
	},

	newCharacter: {
		path: "/new-character",
		component: CreateCharacterForm,
		title: "New character",
		inNavMenu: true,
		exact: false,
	},
};
