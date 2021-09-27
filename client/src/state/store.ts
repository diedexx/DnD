import { createReduxStore, register } from "@wordpress/data";
import CharacterDetails from "../interfaces/CharacterDetails";
import CharacterSummary from "../interfaces/CharacterSummary";
import actions from "./actions";
import controls from "./controls";
import reducer from "./reducer";
import selectors, { resolvers } from "./selectors";

export interface StateInterface {
	characterSummaries: CharacterSummary[];
	characterDetails: CharacterDetails;
}

export interface GraphQLData {
	query: string;
	variables?: Record<string, any>;
}

const store = createReduxStore( "app",
	{
		reducer,
		actions,
		selectors,
		controls,
		resolvers,
	} );

register( store );
