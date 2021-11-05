import CharacterDetailsInterface from "../interfaces/CharacterDetails.interface";
import CharacterSummaryInterface from "../interfaces/CharacterSummary.interface";
import ExecutedActionInterface from "../interfaces/ExecutedAction.interface";
import redoLastUndoneCommand from "../queries/redoLastUndoneCommand";
import undoLastCommand from "../queries/undoLastCommand";
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
	UNDO_ACTION = "UNDO_ACTION",
	REDO_ACTION = "REDO_ACTION",
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
	// eslint-disable-next-line require-jsdoc
	undoAction: function* ( characterId: number ) {
		const response = yield actions.graphQL( { query: undoLastCommand, variables: { characterId } } );
		let history: ExecutedActionInterface[] = response.data.data.undoLastCommand;
		history = history.map( ( action ) =>
			Object.assign( action, { executedAt: new Date( action.executedAt ) } ),
		);
		return actions.setActionHistory( characterId, history );
	},
	// eslint-disable-next-line require-jsdoc
	redoAction: function* ( characterId: number ) {
		const response = yield actions.graphQL( { query: redoLastUndoneCommand, variables: { characterId } } );
		let history: ExecutedActionInterface[] = response.data.data.redoLastUndoneCommand;
		history = history.map( ( action ) =>
			Object.assign( action, { executedAt: new Date( action.executedAt ) } ),
		);
		return actions.setActionHistory( characterId, history );
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

export default actions;
