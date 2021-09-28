import { createReduxStore, register } from "@wordpress/data";
import CharacterDetailsInterface from "../interfaces/CharacterDetails.interface";
import CharacterSummaryInterface from "../interfaces/CharacterSummary.interface";
import actions from "./actions";
import controls from "./controls";
import reducer from "./reducer";
import selectors, { resolvers } from "./selectors";

export interface StateInterface {
	characterSummaries: CharacterSummaryInterface[];
	characterDetails: CharacterDetailsInterface;
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
