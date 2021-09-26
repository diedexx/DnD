import { ACTION_TYPE } from "./actions";
import { StateInterface } from "./store";

const DEFAULT_STATE: StateInterface = {
	characterSummaries: [],
	characterDetails: {},
};

/**
 * The root reducer.
 *
 * @param {StateInterface} state The current state.
 * @param {Object} action The action to reduce.
 *
 * @return {StateInterface} The new state.
 */
const reducer = ( state = DEFAULT_STATE, action ): StateInterface => {
	switch ( action.type ) {
		case ACTION_TYPE.SET_CHARACTER_SUMMARIES:
			return {
				...state,
				characterSummaries: action.characterSummaries,
			};

		case ACTION_TYPE.SET_CHARACTER_DETAILS:
			return {
				...state,
				characterDetails: {
					...state.characterDetails,
					[ action.characterDetails.id ]: action.characterDetails,
				},
			};

		case ACTION_TYPE.CREATE_CHARACTER:
			return {
				...state,
			};
	}

	return state;
};

export default reducer;
