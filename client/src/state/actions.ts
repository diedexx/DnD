import { invalidateResolution } from "@wordpress/data/build/redux-store/metadata/actions";
import CharacterDetailsInterface from "../interfaces/CharacterDetails.interface";
import CharacterSummaryInterface from "../interfaces/CharacterSummary.interface";
import ExecutedActionInterface from "../interfaces/ExecutedAction.interface";
import redoLastUndoneCommand from "../queries/redoLastUndoneCommand";
import undoLastCommand from "../queries/undoLastCommand";
import updateAbilityScore from "../queries/UpdateAbilityScore";
import { GraphQLData } from "./store";

export enum ACTION_TYPE {
	RELOAD_CHARACTER_SHEET = "RELOAD_CHARACTER_SHEET",
	SET_CHARACTER_SUMMARIES = "SET_CHARACTER_SUMMARIES",
	SET_CHARACTER_DETAILS = "SET_CHARACTER_DETAILS",
	SET_ACTION_HISTORY = "SET_ACTION_HISTORY",
	CREATE_CHARACTER = "CREATE_CHARACTER",
	POST_TO_API = "POST_TO_API",
	GRAPHQL = "GRAPHQL",
	FETCH_FROM_API = "FETCH_FROM_API",
	SHOW_ERROR = "SHOW_ERROR",
	UNDO_ACTION = "UNDO_ACTION",
	REDO_ACTION = "REDO_ACTION",
	UPDATE_ABILITY_SCORE = "UPDATE_ABILITY_SCORE"
}

/* eslint-disable require-jsdoc */
const actions = {
	setCharacterSummaries: ( characterSummaries: CharacterSummaryInterface[] ) => ( {
		type: ACTION_TYPE.SET_CHARACTER_SUMMARIES,
		characterSummaries,
	} ),

	setCharacterDetails: ( characterDetails: CharacterDetailsInterface ) => ( {
		type: ACTION_TYPE.SET_CHARACTER_DETAILS,
		characterDetails,
	} ),

	setActionHistory: ( characterId: number, actionHistory: ExecutedActionInterface[] ) => (
		{
			type: ACTION_TYPE.SET_ACTION_HISTORY,
			characterId,
			actionHistory: actionHistory.map( ( action ) =>
				Object.assign( action, { executedAt: new Date( action.executedAt ) } ),
			),
		}
	),

	undoAction: function* ( characterId: number ) {
		const response = yield actions.graphQL( { query: undoLastCommand, variables: { characterId } } );
		yield invalidateResolution( "getCharacterDetails", [ characterId ] );
		yield invalidateResolution( "getCharacterSummaries" );
		return actions.setActionHistory( characterId, response.data.data.undoLastCommand );
	},

	redoAction: function* ( characterId: number ) {
		const response = yield actions.graphQL( { query: redoLastUndoneCommand, variables: { characterId } } );
		yield invalidateResolution( "getCharacterDetails", [ characterId ] );
		yield invalidateResolution( "getCharacterSummaries" );
		return actions.setActionHistory( characterId, response.data.data.redoLastUndoneCommand );
	},

	updateAbilityScore: function* ( characterId: number, abilityScoreId: number, newValue: number ) {
		const response = yield actions.graphQL( {
			query: updateAbilityScore,
			variables: { abilityScoreId, newValue },
		} );

		return invalidateResolution( "getCharacterDetails", [ characterId ] );
	},

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
/* eslint-enable */
export default actions;
