import { CharacterDetails } from "../interfaces/CharacterDetails";
import { CharacterSummary } from "../interfaces/CharacterSummary";
import { GraphQLData } from "./store";

// eslint-disable-next-line no-shadow
export enum ACTION_TYPE {
	SET_CHARACTER_SUMMARIES = "SET_CHARACTER_SUMMARIES",
	SET_CHARACTER_DETAILS = "SET_CHARACTER_DETAILS",
	CREATE_CHARACTER = "CREATE_CHARACTER",
	POST_TO_API = "POST_TO_API",
	GRAPHQL = "GRAPHQL",
	FETCH_FROM_API = "FETCH_FROM_API",
}

const actions = {
	setCharacterSummaries: ( characterSummaries: CharacterSummary[] ) => ( {
		type: ACTION_TYPE.SET_CHARACTER_SUMMARIES,
		characterSummaries,
	} ),

	setCharacterDetails: ( characterDetails: CharacterDetails ) => ( {
		type: ACTION_TYPE.SET_CHARACTER_DETAILS,
		characterDetails,
	} ),

	createCharacter: ( character ) => ( {
		type: ACTION_TYPE.CREATE_CHARACTER,
		character,
	} ),

	graphQL: ( data: GraphQLData ) => ( {
		type: ACTION_TYPE.GRAPHQL,
		data: data,
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
