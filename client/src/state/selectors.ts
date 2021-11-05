import CharacterDetailsInterface from "../interfaces/CharacterDetails.interface";
import CharacterSummaryInterface from "../interfaces/CharacterSummary.interface";
import ExecutedActionInterface from "../interfaces/ExecutedAction.interface";
import getCharacterDetails from "../queries/getCharacterDetails";
import getCharacterSummaries from "../queries/getCharacterSummaries";
import getCommandHistory from "../queries/getCommandHistory";
import actions from "./actions";
import defaultCharacterDetails from "./defaults/characterDetails";
import { StateInterface } from "./store";

const selectors = {
	getCharacterSummaries: ( state: StateInterface ): CharacterSummaryInterface[] => state.characterSummaries,
	getCharacterDetails: ( state: StateInterface, id: number ): CharacterDetailsInterface => state.characterDetails[ id ] || defaultCharacterDetails,
	getActionHistory: ( state: StateInterface, characterId: number ): ExecutedActionInterface[] => state.actionHistory[ characterId ] || [],
};
export default selectors;

export const resolvers = {
	/**
	 * Resolves character summaries by performing actions.
	 *
	 * @return {Generator} The next action.
	 */
	* getCharacterSummaries() {
		try {
			const response = yield actions.graphQL( { query: getCharacterSummaries } );
			const characters = response.data.data.characters;
			return actions.setCharacterSummaries( characters );
		} catch ( e ) {
			console.error( e );
			yield actions.showError( "Failed to fetch characters" );
		}
	},

	/**
	 * Resolves character details for a single character by performing actions.
	 *
	 * @param {number} id The id of the character.
	 *
	 * @return {Generator} The next action.
	 */
	* getCharacterDetails( id: number ) {
		try {
			const response = yield actions.graphQL( { query: getCharacterDetails, variables: { id } } );
			const character: CharacterDetailsInterface = response.data.data.character;
			return actions.setCharacterDetails( character );
		} catch ( e ) {
			console.error( e );
			yield actions.showError( "Failed to fetch character details" );
		}
	},

	/**
	 * Resolves action history by performing actions.
	 *
	 * @param {number} characterId The id of the character.
	 *
	 * @return {Generator} The next action.
	 */
	* getActionHistory( characterId: number ) {
		try {
			const response = yield actions.graphQL( { query: getCommandHistory, variables: { characterId } } );
			let history: ExecutedActionInterface[] = response.data.data.commandHistory;
			history = history.map( ( action ) =>
				Object.assign( action, { executedAt: new Date( action.executedAt ) } ),
			);
			return actions.setActionHistory( characterId, history );
		} catch ( e ) {
			console.error( e );
			yield actions.showError( "Failed to fetch action history" );
		}
	},
};

