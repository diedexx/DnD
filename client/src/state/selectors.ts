import { CharacterDetails } from "../interfaces/CharacterDetails";
import { CharacterSummary } from "../interfaces/CharacterSummary";
import getCharacterDetails from "../queries/getCharacterDetails";
import getCharacterSummaries from "../queries/getCharacterSummaries";
import actions from "./actions";
import { StateInterface } from "./store";

const selectors = {
	getCharacterSummaries: ( state: StateInterface ): CharacterSummary[] => state.characterSummaries,
	getCharacterDetails: ( state: StateInterface, id: number ): CharacterDetails => state.characterDetails[ id ],
};
export default selectors;

export const resolvers = {
	/**
	 * Resolves character summaries by performing actions.
	 *
	 * @return {Generator} The next action.
	 */
	* getCharacterSummaries() {
		const response = yield actions.graphQL( { query: getCharacterSummaries } );
		const characters = response.data.data.characters;
		return actions.setCharacterSummaries( characters );
	},

	/**
	 * Resolves character details for a single character by performing actions.
	 *
	 * @param {number} id The id of the character.
	 *
	 * @return {Generator} The next action.
	 */
	* getCharacterDetails( id: number ) {
		const response = yield actions.graphQL( { query: getCharacterDetails, variables: { id } } );
		const character = response.data.data.character;
		return actions.setCharacterDetails( character );
	},
};

