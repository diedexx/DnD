import CharacterDetailsInterface from "../interfaces/CharacterDetails.interface";
import CharacterSummaryInterface from "../interfaces/CharacterSummary.interface";
import ExecutedActionInterface from "../interfaces/ExecutedAction.interface";
import { GraphQLData } from "./store";

export enum ACTION_TYPE {
	SET_CHARACTER_SUMMARIES = "SET_CHARACTER_SUMMARIES",
	SET_CHARACTER_DETAILS = "SET_CHARACTER_DETAILS",
	SET_ACTION_HISTORY = "SET_ACTION_HISTORY",
	CREATE_CHARACTER = "CREATE_CHARACTER",
	POST_TO_API = "POST_TO_API",
	GRAPHQL = "GRAPHQL",
	FETCH_FROM_API = "FETCH_FROM_API",
	SHOW_ERROR = "SHOW_ERROR",
}

const actions = {
	setCharacterSummaries: ( characterSummaries: CharacterSummaryInterface[] ) => ( {
		type: ACTION_TYPE.SET_CHARACTER_SUMMARIES,
		characterSummaries,
	} ),

	setCharacterDetails: ( characterDetails: CharacterDetailsInterface ) => ( {
		type: ACTION_TYPE.SET_CHARACTER_DETAILS,
		characterDetails,
	} ),

	setActionHistory: ( characterId: number, actionHistory: ExecutedActionInterface[] ) => ( {
		type: ACTION_TYPE.SET_ACTION_HISTORY,
		characterId,
		actionHistory,
	} ),

	createCharacter: ( character ) => ( {
		type: ACTION_TYPE.CREATE_CHARACTER,
		character,
	} ),

	graphQL: ( data: GraphQLData ) => ( {
		type: ACTION_TYPE.GRAPHQL,
		data,
	} ),
	showError: ( message: string ) => ( {
		type: ACTION_TYPE.SHOW_ERROR,
		message,
	} ),

	postToAPI: ( path, data ) => ( {
		type: ACTION_TYPE.POST_TO_API,
		path,
		data,
	} ),

	fetchFromAPI: ( path ) => ( {
		type: ACTION_TYPE.FETCH_FROM_API,
		path,
	} ),
};

export default actions;
