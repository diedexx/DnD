import { ACTION_TYPE } from "./actions";
import { StateInterface } from "./store";

const DEFAULT_STATE: StateInterface = {
	characterSummaries: [],
	characterDetails: {
		id: 0,
		name: "",
		experience: 0,
		health: {
			displayHealth: "0/1",
			currentHealth: 0,
			maxHealth: 0,
		},
		alignment: "",
		background: "",
		"class": { name: "" },
		bonds: "",
		flaws: "",
		level: 0,
		race: "",
		personalityTraits: "",
		abilityScores: [],
		skillScores: [],
		weapons: [],
		wallet: {
			copper: 0,
			silver: 0,
			electrum: 0,
			gold: 0,
			platinum: 0,
		},
	},
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
				characterDetails: action.characterDetails,
			};

		case ACTION_TYPE.CREATE_CHARACTER:
			return {
				...state,
			};
	}

	return state;
};

export default reducer;
